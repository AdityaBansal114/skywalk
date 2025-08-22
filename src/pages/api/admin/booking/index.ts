import { calComClient } from "@/lib/calcom";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse
){
    try {
        console.log("hello");
        if(req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed, only GET is allowed" });
        }
        const { userId: clerkId } = getAuth(req);

        if (!clerkId) {
            return res.status(401).json({ error: "Unauthenticated" });
        }

        const url = await calComClient.generateBookingLink();

        return res.status(200).json({url : url});
    }
    catch (error: any) {
        console.error(`Error in api/user/setDetails: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}