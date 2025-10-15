import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import clerkClient from "./clerkClient";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;

export const checkAdmin = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  if (!userId) return false;
  try {
    const user = await clerkClient.users.getUser(userId);
    const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
    return Boolean(primaryEmail && ADMIN_EMAIL && primaryEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Helper for app router route handlers (Request object based)
export const checkAdminFromAuth = async (auth: { userId: string | null }) => {
  const userId = auth.userId;
  if (!userId) return false;
  try {
    const user = await clerkClient.users.getUser(userId);
    const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
    return Boolean(primaryEmail && ADMIN_EMAIL && primaryEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
