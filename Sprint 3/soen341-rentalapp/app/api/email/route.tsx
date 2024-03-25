import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export async function POST(request: NextRequest) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  const formData = await request.formData();
  const reservation = formData.get("reservation");
  console.log("alo", reservation);

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
      to: myEmail,
      subject: `Your car reservation has been confirmed!`,
      html: `
            <p>Booking Number: </p>
            <p>Pickup Date:  </p>
            <p>Dropoff Date:  </p>
            <p>Location of pickup and dropoff:  </p>

            <p>Thank you for using Rent-A-Koenigsegg! 🚗🤝</p>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
  }
}
