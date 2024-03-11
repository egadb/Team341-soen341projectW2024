"use client";

import { vehicles } from "@/models/vehiclesReservationPage";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa";

export default function VehicleList(item: any) {
  const searchParams = useSearchParams();
  const typeVehicle = searchParams.get("typeVehicle");
  const category = searchParams.get("category");
  const priceRange = searchParams.get("priceRange") as string;

  const [minString, maxString] = priceRange.split("-");
  const minNumber = parseInt(minString, 10);
  const maxNumber = parseInt(maxString, 10);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.typeVehicle === typeVehicle &&
      vehicle.category === category &&
      vehicle.price >= minNumber &&
      vehicle.price <= maxNumber
  );

  const filteredNum = filteredVehicles.length;

  console.log(filteredVehicles);
  console.log(typeVehicle, category, priceRange);
  return (
    <div>
      <div className="mb-12 flex w-full items-center justify-between p-8">
        <h1 className="text-4xl font-bold antialiased">Choose your vehicle!</h1>
        <div className="rounded-lg bg-gray-200 p-2">
          <h3 className="font-bold">{filteredNum} Vehicles Found</h3>
        </div>
      </div>
      <div className=" w-max">
        <div className="grid grid-cols-3 grid-rows-3 items-center gap-10">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="mx-auto flex h-full flex-col justify-between gap-6 rounded-lg border border-white bg-white p-3 hover:shadow-2xl"
            >
              <div className="flex justify-between">
                <p className="font-bold">{vehicle.typeVehicle}</p>
                <div className="">
                  <div className="">
                    <button className="text-2xl text-green-500 hover:text-green-400">
                      <FaCartArrowDown />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  loader={() => vehicle.urlImage}
                  src={vehicle.urlImage}
                  alt={`Image of ${vehicle.typeVehicle}`}
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="rounded-lg bg-gradient-to-r from-sky-300 to-sky-300 p-2 text-sm font-bold">
                  {vehicle.category}
                </div>
                <div className="text-lg font-bold">${vehicle.price},00</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
