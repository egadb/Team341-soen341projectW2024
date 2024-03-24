"use client";

import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function ReservationForm() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "location":
        setLocation(value);
        break;
      case "pickupDate":
        setPickupDate(value);
        break;
      case "returnDate":
        setReturnDate(value);
        break;
      case "typeVehicle":
        setTypeVehicle(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
      default:
        break;
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalFeatures([...additionalFeatures, value]);
    } else {
      setAdditionalFeatures(additionalFeatures.filter((feature) => feature !== value));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const newLocation = formData.get("location") as string;
    const newPickupDate = formData.get("pickupDate") as string;
    const newReturnDate = formData.get("returnDate") as string;
    const newType = formData.get("typeVehicle") as string;
    const newCategory = formData.get("categoryDropdown") as string;
    const newPriceRange = formData.get("priceRange") as string;

    setLocation(newLocation);
    setPickupDate(newPickupDate);
    setReturnDate(newReturnDate);
    setTypeVehicle(newType);
    setCategory(newCategory);
    setPriceRange(newPriceRange);

    // console.log(location);
    // console.log(pickupDate);
    // console.log(returnDate);
    // console.log(typeVehicle);
    // console.log(category);
    // console.log(priceRange);
    // for (let feature of additionalFeatures) {
    //   console.log(feature);
    // }
    //make it go to the next page that displays cars now

    const data = {
      location: location,
      pickupDate: pickupDate,
      returnDate: returnDate,
      typeVehicle: typeVehicle,
      category: category,
      priceRange: priceRange,
      additionalFeatures: additionalFeatures,
    };
    console.log(data);
    router.push(
      `/reservationPage?location=${location}&type=${typeVehicle}&category=${category}&priceRange=${priceRange}&pickupDate=${pickupDate}&returnDate=${returnDate}&additionalFeatures=${additionalFeatures}`
    );
  };

  return (
    <div className="bg-sky-100 grid h-screen place-items-center">
      <div className="rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
        <h1 className="my-4 text-4xl font-bold">Reservation</h1>
        <Provider formAction={handleSubmit}>
          <Spinner />
          <select
            id="locationDropdown"
            className="rounded-md border-2 text-gray-400 p-3"
            name={"location"}
            required
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select a Location
            </option>
            <option value="Montreal">Montreal</option>
            <option value="Laval">Laval</option>
            <option value="West-Island">West Island</option>
          </select>
          Pickup Date
          <input
            type="date"
            className="rounded-md border-2 text-gray-400 p-3"
            name="pickupDate"
            placeholder="Pickup Date"
            required
            onChange={handleChange}
          />
          Return Date
          <input
            type="date"
            className="rounded-md border-2 text-gray-400 p-3"
            name="returnDate"
            placeholder="Return Date"
            required
            onChange={handleChange}
          />
          <select
            id="typeDropdown"
            className="rounded-md border-2 text-gray-400 p-3"
            name={"typeVehicle"}
            required
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select a Type
            </option>
            <option value="Car">Car</option>
            <option value="Suv">SUV</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
          </select>
          <select
            id="categoryDropdown"
            className="rounded-md border-2 text-gray-400 p-3"
            name={"category"}
            required
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select a Category
            </option>
            <option value="Compact">Compact</option>
            <option value="Standard">Standard</option>
            <option value="Intermediate">Intermediate</option>
          </select>
          <select
            id="priceDropdown"
            className="rounded-md border-2 text-gray-400 p-3"
            name={"priceRange"}
            required
            onChange={handleChange}
          >
            <option value="Select a Price Range ($/day)" disabled selected>
              Select a Price Range ($/day)
            </option>
            <option value="30-50">30$ to 50$</option>
            <option value="51-80">51$ to 80$</option>
            <option value="81-120">81$ to 120$</option>
            <option value="121-and-more">121$ and More</option>
          </select>
          {/* <div className="flex flex-wrap">
            <label className="flex w-full items-center sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                type="checkbox"
                name="sunroof"
                value="Sunroof"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2">Sunroof</span>
            </label>
            <label className="flex w-full items-center sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                type="checkbox"
                name="leatherSeats"
                value="Leather Seats"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2">Leather Seats</span>
            </label>
            <label className="flex w-full items-center sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                type="checkbox"
                name="heatedSeats"
                value="Heated Seats"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2">Heated Seats</span>
            </label>
            <label className="flex w-full items-center sm:w-1/2 md:w-1/3 lg:w-1/4">
              <input
                type="checkbox"
                name="backupCamera"
                value="Backup Camera"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2">Backup Camera</span>
            </label>
          </div> */}
          <button
            type="submit"
            className="cursor-pointer bg-sky-900 hover:bg-sky-950 px-6 py-2 font-bold text-white rounded-lg"
          >
            Submit
          </button>
        </Provider>
      </div>
    </div>
  );
}
