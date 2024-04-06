import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export async function POST(request: NextRequest) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  const formData = await request.formData();
  const reservationID = await formData.get("id")?.toString();
  const pickupDate = await formData.get("pickupDate")?.toString();
  const endDate = await formData.get("endDate")?.toString();

  const email = await formData.get("email");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });
  try {
    const mail = await transporter.sendMail({
      from: username,
      to: email,
      subject: `Your car reservation has been confirmed!`,
      html: `
            <p>Booking Number: ${reservationID}</p>
            <p>Pickup Date:  ${pickupDate}</p>
            <p>Dropoff Date:  ${endDate}</p>
            <p>Location of pickup and dropoff:  Montreal</p>

            <p>Thank you for using Rent-A-Koenigsegg! 🚗🤝</p>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
  }
}
