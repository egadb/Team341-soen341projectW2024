"use server";

import { authOptions } from "@/lib/authOptions";
import { User, getServerSession } from "next-auth";

export const getUserSession = async (): Promise<User | null> => {
  return await getServerSession(authOptions);
};
