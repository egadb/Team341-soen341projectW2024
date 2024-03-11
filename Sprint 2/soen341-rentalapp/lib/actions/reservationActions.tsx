"use server";

import { revalidatePath } from "next/cache";
import { connectMongoDB } from "../mongodb";
import Reservation from "@/models/reservation";

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
        extraFeatures
    });

    try {
      await newReservation.save();
    } catch (err: any) {
      throw new Error("Failed to create reservation");
    }
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

  console.log(formData);

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const userID = formData.get("userID")?.toString();
    const vehicleID = formData.get("vehicleID")?.toString();
    const pickupDate = formData.get("pickupDate")?.toString();
    const endDate = formData.get("endDate")?.toString();
    const extraFeatures = formData.get("extraFeatures")?.toString();

    try {
      const reservation = await Reservation.findByIdAndUpdate(_id, { userID, vehicleID, pickupDate, endDate, extraFeatures });
      await reservation.save();
    } catch (err: any) {
      throw new Error("Failed to update reservation");
    }
  }
}

export async function getAllReservations(searchParams: { [key: string]: string | string[] | undefined }) {
  await connectMongoDB();

  const search = searchParams.search || "";
  const sort = searchParams.search || "createdAt";
  const limit = searchParams.limit * 1 || 12;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || limit * (page - 1);

  try {
    const reservations = await Reservation.find({
      $or: [
        { userID: { $regex: search, $options: "i" } },
        { vehicleID: { $regex: search, $options: "i" } },
        { pickupDate: { $regex: search, $options: "i" } },
        { endDate: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await Reservation.find({
      $or: [
        { userID: { $regex: search, $options: "i" } },
        { vehicleID: { $regex: search, $options: "i" } },
        { pickupDate: { $regex: search, $options: "i" } },
        { endDate: { $regex: search, $options: "i" } },
      ],
    }).count();

    const totalPage = Math.ceil(count / limit);
    const reservationArray = reservations.map((reservation) => ({
      _id: reservation._id.toString(),
      userID: reservation.userID,
      vehicleID: reservation.vehicleID,
      pickupDate: reservation.pickupDate,
      endDate: reservation.endDate,
      extraFeatures: reservation.extraFeatures
    }));
    return { reservations: reservationArray, count, totalPage };
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
