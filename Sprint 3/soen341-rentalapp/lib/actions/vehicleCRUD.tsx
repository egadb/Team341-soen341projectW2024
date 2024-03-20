"use server";

import Reservation from "@/models/reservation";
import Vehicle from "@/models/vehicle";
import { revalidatePath } from "next/cache";
import { connectMongoDB } from "../mongodb";

export async function createVehicle(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("model") &&
    formData.get("type") &&
    formData.get("category") &&
    formData.get("price") &&
    formData.get("pictureURL")
  );

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const model = formData.get("model")?.toString();
    const type = formData.get("type")?.toString();
    const category = formData.get("category")?.toString();
    const price = parseFloat(formData.get("price")?.toString() ?? "");
    const pictureURL = formData.get("pictureURL")?.toString();

    const newVehicle = new Vehicle({
      model,
      type,
      category,
      price,
      pictureURL,
    });

    try {
      await newVehicle.save();
    } catch (err: any) {
      throw new Error("Failed to create vehicle");
    }
  }
}

export async function updateVehicle(prevState: any, formData: FormData) {
  const isValid = !!(
    formData.get("_id") &&
    formData.get("model") &&
    formData.get("type") &&
    formData.get("category") &&
    formData.get("price") &&
    formData.get("pictureURL")
  );

  if (isValid) {
    await connectMongoDB();
    const _id = formData.get("_id")?.toString();
    const model = formData.get("model")?.toString();
    const type = formData.get("type")?.toString();
    const category = formData.get("category")?.toString();
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const pictureURL = formData.get("pictureURL")?.toString();

    try {
      await Vehicle.findByIdAndUpdate(_id, { model, type, category, price, pictureURL });
    } catch (err: any) {
      throw new Error("Failed to update vehicle");
    }
  }
}

export async function deleteVehicle(_id: any) {
  await connectMongoDB();
  try {
    await Vehicle.findByIdAndDelete(_id);
    revalidatePath("/");
    return;
  } catch (err: any) {
    throw new Error("Failed to delete vehicle");
  }
}

export async function getAllVehicles(searchParams: { [key: string]: string | undefined }) {
  await connectMongoDB();

  const search = searchParams.search || "";
  const sort = searchParams.sort || "createdAt";
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 12;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const skip = limit * (page - 1);

  try {
    const vehicles = await Vehicle.find({
      $or: [
        { model: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await Vehicle.countDocuments({
      $or: [
        { model: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });

    const totalPages = Math.ceil(count / limit);
    const vehicleArray = vehicles.map((vehicle) => ({
      _id: vehicle._id.toString(),
      model: vehicle.model,
      type: vehicle.type,
      category: vehicle.category,
      price: vehicle.price,
      pictureURL: vehicle.pictureURL,
    }));
    return { vehicles: vehicleArray, count, totalPages };
  } catch (err: any) {
    throw new Error("Failed to get vehicles");
  }
}

export async function getAllAvailableVehicles(searchParams: { [key: string]: string | undefined }) {
  await connectMongoDB();

  const type = searchParams.type || "";
  const category = searchParams.category || "";
  const priceRange = searchParams.priceRange || "";
  const lowerPrice = priceRange.split("-")[0];
  const upperPrice = priceRange.split("-")[1];
  const pickupDate = searchParams.pickupDate || "";
  const endDate = searchParams.returnDate || "";
  const sort = searchParams.sort || "createdAt";
  const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 12;
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const skip = limit * (page - 1);
  var reservedVehiclesArray;
  try {
    const reservations = await Reservation.find({
      $or: [
        { pickupDate: { $gte: new Date(pickupDate), $lte: new Date(endDate) } },
        { endDate: { $gte: new Date(pickupDate), $lte: new Date(endDate) } },
      ],
    })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    reservedVehiclesArray = reservations.map((reservation) => ({
      _id: reservation.vehicleID.toString(),
    }));
  } catch (err: any) {
    throw new Error("Failed to get reservations");
  }

  try {
    const vehicles = await Vehicle.find({
      $and: [
        { _id: { $nin: reservedVehiclesArray } },
        { type: { $regex: type, $options: "i" } },
        { category: { $regex: category, $options: "i" } },
        { price: { $gt: lowerPrice, $lt: upperPrice } },
      ],
    })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await Vehicle.countDocuments({
      $and: [
        { _id: { $nin: reservedVehiclesArray } },
        { type: { $regex: type, $options: "i" } },
        { category: { $regex: category, $options: "i" } },
        { price: { $gt: lowerPrice, $lt: upperPrice } },
      ],
    });

    const totalPages = Math.ceil(count / limit);
    const vehicleArray = vehicles.map((vehicle) => ({
      _id: vehicle._id.toString(),
      model: vehicle.model,
      type: vehicle.type,
      category: vehicle.category,
      price: vehicle.price,
      pictureURL: vehicle.pictureURL,
    }));
    return { vehicles: vehicleArray, count, totalPages };
  } catch (err: any) {
    throw new Error("Failed to get vehicles");
  }
}
