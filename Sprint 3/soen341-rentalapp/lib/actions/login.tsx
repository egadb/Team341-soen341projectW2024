"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Login(prevState: any, formData: FormData) {
  const isValid = !!(formData.get("email") && formData.get("password"));

  if (isValid) {
    const email = formData.get("email") as string;
    const password = formData.get("password")?.toString();
    if (!isValidEmail(email)) {
      return { error: "Email is invalid" };
    }

    if (!password || password.length < 8) {
      return { error: "Password is invalid" };
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      return { error: "Invalid email or password" };
    } else {
      redirect(`/`);
    }
  }
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};
