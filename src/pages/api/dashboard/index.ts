import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getAuth } from '@clerk/nextjs/server';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get user with subscriptions
    const user = await db.user.findUnique({
      where: { clerkId },
      include: {
        subscriptions: {
          orderBy: { buyDate: 'desc' }
        },
        payments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Determine if user can book service
    // Logic: User can book if they have an active subscription
    const activeSubscription = user.subscriptions.find(sub => sub.status === 'active');
    const canBookService = !!activeSubscription;

    return res.status(200).json({
      user,
      canBookService,
      payments: user.payments,
    });

  } catch (error: any) {
    console.error("Error in /api/dashboard:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


