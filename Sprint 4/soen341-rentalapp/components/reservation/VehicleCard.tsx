"use client";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import { useEditItemContext } from "../global/Provider";

export default function VehicleCard(vehicle: any) {
  const { setCreateItem } = useEditItemContext();

  vehicle = vehicle.vehicle;
  return (
    <div className="mx-auto flex h-full cursor-pointer flex-col justify-between gap-6 rounded-lg border border-white bg-white p-3 hover:shadow-2xl">
      <div className="flex justify-between">
        <p className="font-bold">{vehicle.model}</p>
        <div className="">
          <div className="">
            <button
              key={vehicle._id}
              onClick={() => setCreateItem(vehicle)}
              className="text-2xl text-sky-700 hover:text-sky-500"
            >
              <FaInfoCircle />
            </button>
          </div>
        </div>
      </div>
      <div>
        <Image
          className="rounded-lg"
          src={vehicle.pictureURL}
          alt={`Image of ${vehicle.model}`}
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
  );
}
