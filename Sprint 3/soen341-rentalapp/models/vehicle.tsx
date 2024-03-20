import mongoose, { Schema, models } from "mongoose";

const vehicleSchema = new Schema(
  {
    model: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "",
      required: true,
    },
    category: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    pictureURL: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
