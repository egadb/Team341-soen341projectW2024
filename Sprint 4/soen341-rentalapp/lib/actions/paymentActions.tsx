"use server";
import { redirect } from "next/navigation";
import { createReservationUser } from "./reservationActions";
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

export async function handlePayment(prevState: any, formData: FormData) {
  const cardNumber = formData.get("cardNumber")?.toString() || "";
  const expiryDate = formData.get("expiryDate")?.toString() || "";
  const cvv = formData.get("cvv")?.toString() || "";

  const { isValidCardNumber, isValidExpiryDate, isValidCVV } = validateInfo(
    cardNumber,
    expiryDate,
    cvv
  );

  if (!isValidCardNumber || !isValidExpiryDate || !isValidCVV) {
    return { error: "Please check your payment information and try again." };
  }
  createReservationUser(null, formData);
  redirect("/");
}
