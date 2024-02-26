"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User, getServerSession } from "next-auth";

export const getUserSession = async (): Promise<User | null> => {
  return await getServerSession(authOptions);
};
