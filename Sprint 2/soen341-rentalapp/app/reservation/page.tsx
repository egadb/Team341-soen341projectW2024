"use client";

import { useState } from "react";

export default function ReservationForm() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [additionalFeatures, setAdditionalFeatures] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle form submission here
  };
  return (
    <div className="grid h-screen ">
      <div className="h-full rounded-lg bg-red-800 p-5 shadow-lg">
        <h1 className="my-4 text-xl font-bold">Reservation</h1>
        <form onSubmit={handleSubmit} className="h-full">
          <input
            type="text"
            className="rounded-md border-2 p-2 text-black"
            name="location"
            placeholder="  Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <br />
          <br />
          <div className="mb-2">Pickup Date</div>
          <input
            type="date"
            className="rounded-md border-2 p-2 text-black"
            name="pickupDate"
            placeholder="  Pickup Date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
          <br />
          <br />
          <div className="mb-2">Return Date</div>
          <input
            type="date"
            className="rounded-md border-2 p-2 text-black"
            name="returnDate"
            placeholder="  Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            className="rounded-md border-2 p-2 text-black"
            name="category"
            placeholder="  Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            className="rounded-md border-2 p-2 text-black"
            name="priceRange"
            placeholder="  Price Range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            className="rounded-md border-2 p-2 text-black"
            name="additionalFeatures"
            placeholder="  Additional Features"
            value={additionalFeatures}
            onChange={(e) => setAdditionalFeatures(e.target.value)}
          />
          <br />
          <br />
          <button
            type="submit"
            className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
