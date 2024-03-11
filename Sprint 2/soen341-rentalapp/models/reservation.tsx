import mongoose, { Schema, models } from "mongoose";

const reservationSchema = new Schema(
  {
    userID: {
      type: String,
      default: "",
      required: true,
    },
    vehicleID: {
      type: String,
      default: "",
      required: true,
    },
    pickupDate: {
      type: String,
      default: "",
      required: true,
    },
    endDate: {
      type: String,
      default: "",
      required: true,
    },
    extraFeatures: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = models.Reservation || mongoose.model("Reservation", reservationSchema);
export default Reservation;
