import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
      required: true,
    },
    lastName: {
      type: String,
      default: "",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      default: "",
      required: true,
    },
    password: {
      type: String,
      default: "",
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
