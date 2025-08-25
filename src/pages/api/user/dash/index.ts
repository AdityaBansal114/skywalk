import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server'
import { db } from "@/lib/db";
import { stripe } from '@/lib/stripe';

export default async function mySubs(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const { userId: clerkId } = getAuth(req);

            if (!clerkId) {
                return res.status(401).json({ error: 'Unauthorized' })
            }

            const user = await db.user.findUnique({
                where: {
                    clerkId
                },
                include: {
                    subscriptions: {
                        orderBy: { buyDate: 'desc' },
                        include: {
                            payments: {
                                orderBy: { createdAt: 'desc' }
                            }
                        }
                    },
                    payments: {
                        orderBy: { createdAt: 'desc' },
                        include: {
                            subscription: true
                        }
                    }
                }
            })

            if (!user) {
                return res.status(200).json({ user: null, canBookService: false, stripeSubscription: null })
            }

            // Check if user can book service based on active subscriptions
            const activeSubscription = user.subscriptions.find(sub => sub.status === 'active');
            const canBookService = !!activeSubscription;

            // Get Stripe subscription details if user has an active subscription
            let stripeSubscription = null;
            if (activeSubscription) {
                try {
                    // Find Stripe customer
                    const customers = await stripe.customers.list({
                        email: user.email,
                        limit: 1
                    });

                    if (customers.data.length > 0) {
                        const customer = customers.data[0];
                        
                        // Get active subscriptions for this customer
                        const subscriptions = await stripe.subscriptions.list({
                            customer: customer.id,
                            status: 'active',
                            limit: 1
                        });

                        if (subscriptions.data.length > 0) {
                            const sub = subscriptions.data[0];
                            stripeSubscription = {
                                id: sub.id,
                                status: sub.status,
                                current_period_end: (sub as any).current_period_end || null,
                                cancel_at_period_end: (sub as any).cancel_at_period_end || false,
                                planId: sub.metadata.planId || null
                            };
                        }
                    }
                } catch (error) {
                    console.error('Error fetching Stripe subscription:', error);
                }
            }

            return res.status(200).json({ 
                user: user, 
                canBookService: canBookService,
                stripeSubscription,
                payments: user.payments
            })
        }
        catch (error) {
            console.log("Error in the GET api/user/dash:", error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }
    else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}