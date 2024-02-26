"use server";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectMongoDB } from "../mongodb";

export default async function CreateUser(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("lastName") &&
    formData.get("firstName") &&
    formData.get("email") &&
    formData.get("password")
  );

  if (isValid) {
    await connectMongoDB();
    let lastname = formData.get("lastName")?.toString();
    let firstname = formData.get("firstName")?.toString();
    let email = formData.get("email")?.toString();
    let password = formData.get("password") as string;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    if (!password || password.length < 8) {
      return { error: "Password is invalid" };
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (err: any) {
      throw new Error("Failed to create user");
    }
    redirect(`/login?ref=register`);
  }
}
