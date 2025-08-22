import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server'
import { db } from "@/lib/db";

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
                        orderBy: { buyDate: 'desc' }
                    }
                }
            })

            if (!user) {
                return res.status(200).json({ user: null, canBookService: false })
            }

            // Check if user can book service based on active subscriptions
            const activeSubscription = user.subscriptions.find(sub => sub.status === 'active');
            const canBookService = !!activeSubscription;

            return res.status(200).json({ user: user, canBookService: canBookService })
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