"use client";

import { useState } from "react";

export default async function ProvidePaymentInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleConfirm = async () => {
    // Validate payment information here
    // Create a new reservation object
  };

  return (
    <div>
      <h1>Payment Information</h1>
      <label>
        Card Number:
        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Expiry Date:
        <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      </label>
      <br />
      <label>
        CVV:
        <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
      </label>
      <br />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}
