import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { stripe, CANCELLATION_FEE } from '@/lib/stripe';
import { db } from '@/lib/db';

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
    const user = await db.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get Stripe customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    });

    if (customers.data.length === 0) {
      return res.status(404).json({ error: 'Stripe customer not found' });
    }

    const customer = customers.data[0];

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    if (subscription.customer !== customer.id) {
      return res.status(403).json({ error: 'Subscription does not belong to user' });
    }

    // Create invoice item for cancellation fee
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      amount: CANCELLATION_FEE,
      currency: 'usd',
      description: 'Early cancellation fee',
      metadata: {
        type: 'cancellation_fee',
        subscriptionId,
        clerkId
      }
    });

    // Create and finalize invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false,
      collection_method: 'charge_automatically',
      metadata: {
        type: 'cancellation_invoice',
        subscriptionId,
        clerkId
      }
    });

    // Add the invoice item to the invoice
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: CANCELLATION_FEE,
      currency: 'usd',
      description: 'Early cancellation fee',
      metadata: {
        type: 'cancellation_fee',
        subscriptionId,
        clerkId
      }
    });

    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Pay the invoice immediately
    const paidInvoice = await stripe.invoices.pay(finalizedInvoice.id, {
      paid_out_of_band: false
    });

    // Cancel the subscription immediately
    const cancelledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      cancel_immediately: true
    });

    // Update database - mark subscription as cancelled
    await db.subscription.updateMany({
      where: {
        userId: user.id,
        status: 'active'
      },
      data: {
        status: 'cancelled'
      }
    });

    // Update progress to completed
    await db.progress.update({
      where: { clerkId },
      data: { currentStep: 4 }
    });

    return res.status(200).json({
      message: 'Subscription cancelled successfully',
      cancellationFee: CANCELLATION_FEE / 100, // Convert back to dollars
      invoiceId: paidInvoice.id,
      subscriptionId: cancelledSubscription.id
    });

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

