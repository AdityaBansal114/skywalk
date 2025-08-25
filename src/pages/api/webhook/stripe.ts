import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { stripe, SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { db } from '@/lib/db';
import calculateServiceTime from '@/lib/serviceTimeCal';
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    console.log('inside handleInvoicePaymentSucceeded');
    const subscriptionId = invoice.lines.data[0].parent.subscription_item_details.subscription;
    if (!subscriptionId){
      console.error('Missing subscriptionId in invoice:', invoice.id);
      return;
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const clerkId = subscription.metadata.clerkId;
    const userId = subscription.metadata.userId;
    const planId = subscription.metadata.planId;
    
    if (!clerkId || !userId || !planId) {
      console.error('Missing metadata in subscription:', subscriptionId);
      return;
    }
    
    
    const existingSub = await db.subscription.findUnique({
      where:{
        stripeSubscriptionId : subscriptionId
      }
    })
    let sub ;

    if(!existingSub){
      const {serviceStartTime, serviceEndTime} = calculateServiceTime(new Date());
      const progress = await db.progress.findUnique({
        where:{
          clerkId
        },
        select:{
          agreementURL: true
        }
      })
      const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];
      
      sub = await db.subscription.create({
        data:{
          stripeSubscriptionId : subscriptionId,
          userId,
          subscriptionType: planId,
          status: 'active',
          buyDate: new Date(),
          serviceStartTime: serviceStartTime.toISOString(),
          serviceEndTime: serviceEndTime.toISOString(),
          agreementURL: progress!.agreementURL || '',
          servicesLeft: plan.frequency
        }
      })
    }
    else{
      sub = existingSub;
    }

    
    const invoiceId : string = invoice.id;
    const invoiceLink: string = invoice.hosted_invoice_url;

    console.log('invoiceId', invoiceId);
    console.log('invoiceLink', invoiceLink);

    await db.payment.create({
      data:{
        invoiceId,
        invoiceLink,
        subscriptionId: sub.id,
        userId,
      }
    })

    const progress = await db.progress.findUnique({
      where:{
        clerkId
      },
      select:{
        id: true
      }
    })
    
    if(progress){
      await db.progress.delete({
        where:{
          id: progress.id
        }
      })
    }

    console.log(`Subscription ${subscriptionId} payment succeeded for user ${clerkId}`);
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  try {
    const clerkId = subscription.metadata.clerkId;
    const userId = subscription.metadata.userId;

    if (!clerkId || !userId) {
      console.error('Missing metadata in deleted subscription:', subscription.id);
      return;
    }

    // Update subscription status in database
    await db.subscription.updateMany({
      where: {
        userId,
        status: 'active'
      },
      data: {
        status: 'cancelled'
      }
    });

    console.log(`Subscription ${subscription.id} cancelled for user ${clerkId}`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

async function handleCustomerSubscriptionUpdated(subscription: any) {
  try {
    const clerkId = subscription.metadata.clerkId;
    const userId = subscription.metadata.userId;
    const planId = subscription.metadata.planId;

    if (!clerkId || !userId || !planId) {
      console.error('Missing metadata in subscription update:', subscription.id);
      return;
    }

    // Update subscription status based on Stripe status
    let status = 'active';
    if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      status = 'cancelled';
    } else if (subscription.status === 'past_due') {
      status = 'past_due';
    }

    await db.subscription.updateMany({
      where: {
        userId,
        status: 'active'
      },
      data: {
        status
      }
    });

    console.log(`Subscription ${subscription.id} updated to status ${status} for user ${clerkId}`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }

    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded');
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleCustomerSubscriptionUpdated(event.data.object);
        break;

      case 'checkout.session.completed':
        // Handle successful checkout completion
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

