"use server";

import Reservation from "@/models/reservation";
import User from "@/models/user";
import Vehicle from "@/models/vehicle";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectMongoDB } from "../mongodb";

export async function createReservation(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("userID") &&
    formData.get("vehicleID") &&
    formData.get("pickupDate") &&
    formData.get("endDate") &&
    formData.get("extraFeatures") &&
    formData.get("price")
  );

  if (isValid) {
    console.log(formData);
    await connectMongoDB();
    let userID = formData.get("userID")?.toString();
    let vehicleID = formData.get("vehicleID")?.toString();
    let pickupDate = formData.get("pickupDate")?.toString();
    let endDate = formData.get("endDate")?.toString();
    let extraFeatures = formData.get("extraFeatures")?.toString();
    let price = formData.get("price")?.toString();

    const newReservation = new Reservation({
      userID,
      vehicleID,
      pickupDate,
      endDate,
      extraFeatures,
      price,
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
    formData.get("endDate")
  );
  console.log("isValid " + isValid);
  if (isValid) {
    await connectMongoDB();
    let email = formData.get("userID")?.toString() || "null";
    const user = await User.findOne({ email: email });
    let userID = user._id;
    let vehicleID = formData.get("vehicleID")?.toString();
    let pickupDate = formData.get("pickupDate")?.toString();
    let endDate = formData.get("endDate")?.toString();
    let extraFeatures = formData.get("extraFeatures")?.toString();
    let price = formData.get("price")?.toString();
    const newReservation = new Reservation({
      userID,
      vehicleID,
      pickupDate,
      endDate,
      extraFeatures,
      price,
    });
    const emailFormData = new FormData();
    emailFormData.append("userID", newReservation.userID);
    emailFormData.append("vehicleID", newReservation.vehicleID);
    emailFormData.append("pickupDate", newReservation.pickupDate);
    emailFormData.append("endDate", newReservation.endDate);
    emailFormData.append("id", newReservation._id);
    emailFormData.append("price", newReservation.price);
    emailFormData.append("email", email);

    try {
      await newReservation.save();
    } catch (err: any) {
      throw new Error("Failed to create reservation");
    }
    try {
      await fetch("http://localhost:3000/api/email", {
        method: "post",
        body: emailFormData,
      });
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to send email");
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
    formData.get("extraFeatures") &&
    formData.get("price")
  );

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const userID = formData.get("userID")?.toString();
    const vehicleID = formData.get("vehicleID")?.toString();
    const pickupDate = formData.get("pickupDate")?.toString();
    const endDate = formData.get("endDate")?.toString();
    const extraFeatures = formData.get("extraFeatures")?.toString();
    const price = formData.get("price")?.toString();

    try {
      const reservation = await Reservation.findByIdAndUpdate(_id, {
        userID,
        vehicleID,
        pickupDate,
        endDate,
        extraFeatures,
        price,
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
      price: reservation.price,
    }));
    return { reservations: reservationArray, count, totalPage };
  } catch (err: any) {
    throw new Error("Failed to get all reservations");
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
      price: reservation.price.toString(),
    }));
    return { reservations: reservationArray, count };
  } catch (err: any) {
    throw new Error("Failed to get user reservations");
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

export async function getReservationInfo(_id: any) {
  await connectMongoDB();

  try {
    const reservation = await Reservation.findById(_id);
    const user = await User.findById(reservation?.userID?.toString());
    const vehicle = await Vehicle.findById(reservation?.vehicleID?.toString());
    return { reservation: reservation, user: user, vehicle: vehicle };
  } catch (err: any) {
    throw new Error("Failed to get reservations");
  }
}

export async function getAgreement(prevState: any, formData: FormData) {
  const isValid = !!formData.get("bookingNumber");

  if (isValid) {
    var url = "/agreement?id=" + formData.get("bookingNumber");
    redirect(url);
  }
}
