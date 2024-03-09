"use server";

import Vehicle from "@/models/vehicle";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

    export async function getAllVehicles(searchParams: { [key: string]: string | string[] | undefined }) {
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
      
          const count = await Vehicle.find({
            $or: [
              { model: { $regex: search, $options: "i" } },
              { type: { $regex: search, $options: "i" } },
              { category: { $regex: search, $options: "i" } },
            ],
          }).count();
      
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
