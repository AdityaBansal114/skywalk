import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import clerkClient from "./clerkClient";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;

export const checkAdmin = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return false;
  }

  try {

    const user = await clerkClient.users.getUser(userId)
    // console.log(user.emailAddresses);
    const flag =  user.emailAddresses[0].emailAddress === ADMIN_EMAIL;
    // console.log(flag? "Admin" : "Not Admin");
    return flag;

  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
