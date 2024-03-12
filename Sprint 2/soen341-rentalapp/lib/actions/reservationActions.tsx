"use server";

import Reservation from "@/models/reservation";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectMongoDB } from "../mongodb";

export async function createReservation(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("userID") &&
    formData.get("vehicleID") &&
    formData.get("pickupDate") &&
    formData.get("endDate") &&
    formData.get("extraFeatures")
  );

  if (isValid) {
    await connectMongoDB();
    let userID = formData.get("userID")?.toString();
    let vehicleID = formData.get("vehicleID")?.toString();
    let pickupDate = formData.get("pickupDate")?.toString();
    let endDate = formData.get("endDate")?.toString();
    let extraFeatures = formData.get("extraFeatures")?.toString();

    const newReservation = new Reservation({
      userID,
      vehicleID,
      pickupDate,
      endDate,
      extraFeatures,
    });

    try {
      await newReservation.save();
    } catch (err: any) {
      throw new Error("Failed to create reservation");
    }
  }
}

export async function createReservationUser(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("userID") &&
    formData.get("vehicleID") &&
    formData.get("pickupDate") &&
    formData.get("endDate") &&
    formData.get("extraFeatures")
  );

  if (isValid) {
    await connectMongoDB();
    let userID = formData.get("userID")?.toString();
    const user = await User.findOne({ email: userID });
    userID = user._id;
    let vehicleID = formData.get("vehicleID")?.toString();
    let pickupDate = formData.get("pickupDate")?.toString();
    let endDate = formData.get("endDate")?.toString();
    let extraFeatures = formData.get("extraFeatures")?.toString();

    const newReservation = new Reservation({
      userID,
      vehicleID,
      pickupDate,
      endDate,
      extraFeatures,
    });
    try {
      await newReservation.save();
    } catch (err: any) {
      throw new Error("Failed to create reservation");
    }
    redirect("/myReservations");
  }
}

export async function updateReservation(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("_id") &&
    formData.get("userID") &&
    formData.get("vehicleID") &&
    formData.get("pickupDate") &&
    formData.get("endDate") &&
    formData.get("extraFeatures")
  );

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const userID = formData.get("userID")?.toString();
    const vehicleID = formData.get("vehicleID")?.toString();
    const pickupDate = formData.get("pickupDate")?.toString();
    const endDate = formData.get("endDate")?.toString();
    const extraFeatures = formData.get("extraFeatures")?.toString();

    try {
      const reservation = await Reservation.findByIdAndUpdate(_id, {
        userID,
        vehicleID,
        pickupDate,
        endDate,
        extraFeatures,
      });
      await reservation.save();
    } catch (err: any) {
      throw new Error("Failed to update reservation");
    }
  }
}

export async function getAllReservations(searchParams: { [key: string]: string | undefined }) {
  await connectMongoDB();

  const search = searchParams.search || "";
  const sort = searchParams.sort || "createdAt";
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 12;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const skip = limit * (page - 1);

  try {
    const reservations = await Reservation.find().sort(sort).limit(limit).skip(skip);
    const count = await Reservation.countDocuments();

    const totalPage = Math.ceil(count / limit);
    const reservationArray = reservations.map((reservation) => ({
      _id: reservation._id.toString(),
      userID: reservation.userID.toString(),
      vehicleID: reservation.vehicleID.toString(),
      pickupDate: reservation.pickupDate.toString(),
      endDate: reservation.endDate.toString(),
      extraFeatures: reservation.extraFeatures,
    }));
    return { reservations: reservationArray, count, totalPage };
  } catch (err: any) {
    throw new Error("Failed to get reservations");
  }
}

export async function getUserReservations(userEmail: string) {
  await connectMongoDB();

  try {
    const user = await User.findOne({ email: userEmail });
    const reservations = await Reservation.find({ userID: user._id });
    const count = await Reservation.countDocuments();

    const reservationArray = reservations.map((reservation) => ({
      _id: reservation._id.toString(),
      userID: reservation.userID.toString(),
      vehicleID: reservation.vehicleID.toString(),
      pickupDate: reservation.pickupDate.toString(),
      endDate: reservation.endDate.toString(),
      extraFeatures: reservation.extraFeatures,
    }));
    return { reservations: reservationArray, count };
  } catch (err: any) {
    throw new Error("Failed to get reservations");
  }
}

export async function deleteReservation(_id: any) {
  await connectMongoDB();
  try {
    await Reservation.findByIdAndDelete(_id);
    revalidatePath("/");
    return;
  } catch (err: any) {
    throw new Error("Failed to delete reservation");
  }
}
