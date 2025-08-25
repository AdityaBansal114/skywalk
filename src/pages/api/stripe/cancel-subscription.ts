import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { calculateCancellationFee } from '@/lib/cancellationFeeCalculator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'Subscription ID is required' });
    }

    // Get user from database
    const userWithSub = await db.user.findFirst({
      where: {
        clerkId,
        subscriptions: {
          some: {
            stripeSubscriptionId: subscriptionId,
          },
        },
      },
      include: {
        subscriptions: true, // optional, only if you want subscription details
      },
    });

    if (!userWithSub) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get subscription details from database
    const subscription = await db.subscription.findUnique({
      where: {
        stripeSubscriptionId: subscriptionId
      }
    });

    console.log('1')

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Calculate the cancellation fee using the new library
    const feeResult = calculateCancellationFee(
      subscription.subscriptionType,
      subscription.serviceEndTime.toISOString(),
      subscription.buyDate.toISOString()
    );

    const customerId = subscription.stripeCustomerId;

    // Only charge fee if there should be one
    if (feeResult.shouldApplyFee && feeResult.feeAmount > 0) {
      // Create invoice item for cancellation fee (amount in cents)
      console.log('2')
      await stripe.invoiceItems.create({
        customer: customerId,
        amount: feeResult.feeAmount * 100, // in cents → $20 cancellation fee
        currency: 'usd',
        description: 'Early cancellation fee',
      });
      
      // Immediately finalize and charge the invoice
      const invoice = await stripe.invoices.create({
        customer: customerId,
        auto_advance: true, // automatically charge
      });
      
      await stripe.invoices.pay(invoice!.id!);
      
      // Now cancel the subscription
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false, // immediate cancel
      });


    }

    console.log('6')

    // Cancel the subscription immediately
    const cancelledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: 'none'
    });


    return res.status(200).json({
      message: 'Subscription cancelled successfully',
      cancellationFee: feeResult.feeAmount,
      cancellationFeeFormatted: feeResult.feeAmountFormatted,
      monthsCharged: feeResult.monthsCharged,
      reason: feeResult.reason,
      subscriptionId: cancelledSubscription.id
    });

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

