"use server";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectMongoDB } from "../mongodb";

export async function registerUser(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("lastName") &&
    formData.get("firstName") &&
    formData.get("email") &&
    formData.get("password")
  );

  if (isValid) {
    await connectMongoDB();
    let lastName = formData.get("lastName")?.toString();
    let firstName = formData.get("firstName")?.toString();
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
      firstName,
      lastName,
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

export async function createUser(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("lastName") &&
    formData.get("firstName") &&
    formData.get("email") &&
    formData.get("role") &&
    formData.get("password")
  );

  if (isValid) {
    await connectMongoDB();
    let lastName = formData.get("lastName")?.toString();
    let firstName = formData.get("firstName")?.toString();
    let email = formData.get("email")?.toString();
    let role = formData.get("role")?.toString();
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
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (err: any) {
      throw new Error("Failed to create user");
    }
    revalidatePath("/");
  }
}

export async function updateUser(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("_id") &&
    formData.get("lastName") &&
    formData.get("firstName") &&
    formData.get("email") &&
    formData.get("role")
  );

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const email = formData.get("email")?.toString();
    const role = formData.get("role")?.toString();

    const existingUser = await User.findOne({ email });
    if (existingUser?._id.toString() !== _id) {
      return { error: "Email already in use" };
    }

    try {
      const user = await User.findByIdAndUpdate(_id, { lastName, firstName, email, role });
      await user.save();
      revalidatePath("/");
    } catch (err: any) {
      throw new Error("Failed to create user");
    }
  }
}

export async function getAllUsers(searchParams: { [key: string]: string | undefined }) {
  await connectMongoDB();

  const search = searchParams.search || "";
  const sort = searchParams.sort || "createdAt";
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 12;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const skip = limit * (page - 1);

  try {
    const users = await User.find({
      $or: [
        { lastName: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await User.countDocuments({
      $or: [
        { lastName: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });

    const totalPage = Math.ceil(count / limit);
    const userArray = users.map((user) => ({
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }));
    return { users: userArray, count, totalPage };
  } catch (err: any) {
    throw new Error("Failed to get users");
  }
}

export async function deleteUser(_id: any) {
  await connectMongoDB();
  try {
    await User.findByIdAndDelete(_id);
    revalidatePath("/");
    return;
  } catch (err: any) {
    throw new Error("Failed to delete user");
  }
}
