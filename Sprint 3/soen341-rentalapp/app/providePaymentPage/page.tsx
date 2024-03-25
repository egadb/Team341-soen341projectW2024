"use client";

import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { createReservationUser } from "@/lib/actions/reservationActions";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProvidePaymentInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const formData = new FormData();
  const session = await getUserSession();

  const validateInfo = (cardNumber: string, expiryDate: string, cvv: string) => {
    const cardNumberRegex = /^[0-9]{13,16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    const isValidCardNumber = cardNumberRegex.test(cardNumber.replace(/\s/g, ""));
    const isValidExpiryDate = expiryDateRegex.test(expiryDate);
    const isValidCVV = cvvRegex.test(cvv);

    return {
      isValidCardNumber,
      isValidExpiryDate,
      isValidCVV,
    };
  };
  const confirmation = () => {
    alert("Payment information confirmed! An email has been sent to you!");
    //need to send email
    redirect("/");
  };
  const handleConfirm = async () => {
    const cardNumber =
      (document.querySelector('input[name="cardNumber"]') as HTMLInputElement)?.value || "";
    const expiryDate =
      (document.querySelector('input[name="expiryDate"]') as HTMLInputElement)?.value || "";
    const cvv = (document.querySelector('input[name="cvv"]') as HTMLInputElement)?.value || "";

    const { isValidCardNumber, isValidExpiryDate, isValidCVV } = validateInfo(
      cardNumber,
      expiryDate,
      cvv
    );
    function generateBookingNumber(): string {
      const min = 10000;
      const max = 99999;
      const bookingNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return bookingNumber.toString();
    }
    const bookingNumber = generateBookingNumber();

    if (!isValidCardNumber || !isValidExpiryDate || !isValidCVV) {
      alert("Invalid payment information");
      return;
    }

    // Proceed with form submission
    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        const value = searchParams[key] || "";
        formData.append(key, value);
        console.log(`Appended ${key}: ${value}`);
      }
    }
    formData.append("userID", session?.user?.email as string);
    createReservationUser(params.slug, formData);
    confirmation();
  };

  return (
    <div className="grid h-screen place-items-center bg-sky-100">
      <div className="rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
        <h1 className="my-4 text-4xl font-bold">Provide Payment Information</h1>
        <Provider formAction={handleConfirm}>
          <Spinner />
          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="cardNumber"
            placeholder="Card Number"
            required
          />
          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="expiryDate"
            placeholder="Expiration Date"
            required
          />
          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="cvv"
            placeholder="CVV"
            required
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-sky-900 px-6 py-2 font-bold text-white hover:bg-sky-950"
          >
            Confirm
          </button>
        </Provider>
      </div>
    </div>
  );
}
