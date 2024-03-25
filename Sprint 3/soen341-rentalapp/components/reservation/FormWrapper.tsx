"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import Provider from "../form/Provider";
import { useEditItemContext } from "../global/Provider";

export default function FormWrapper(actions: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  const searchParams = useSearchParams();
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const router = useRouter();
  let carId = createItem?._id;
  console.log(carId);
  let featuresString = searchParams.get("additionalFeatures");
  let additionalFeaturesArr = featuresString?.split(",");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalServices([...additionalServices, value]);
    } else {
      setAdditionalServices(additionalServices.filter((services) => services !== value));
    }
  };

  const handleSubmit = () => {
    router.push(
      `/availabilityAndPrice?carId=${carId}&branch=${searchParams.get("location")}&category=${searchParams.get("category")}&priceRange=${searchParams.get("priceRange")}&pickupDate=${searchParams.get("pickupDate")}&returnDate=${searchParams.get("returnDate")}&additionalFeatures=${searchParams.get("additionalFeatures")}&additionalServices=${additionalServices}`
    );
  };
  return (
    <div>
      {createItem ? (
        <div className="fixed left-0 top-0 h-full w-full bg-white/60 px-96 py-52">
          <Provider formAction={handleSubmit}>
            <div className=" flex w-fit flex-col gap-8 rounded-lg bg-white p-4">
              <div>
                <button
                  onClick={() => setCreateItem(undefined)}
                  className="cursor-pointer text-4xl font-bold text-red-700 hover:text-red-500"
                >
                  <BsArrowLeftCircle />
                </button>
              </div>
              <div className="flex flex-row gap-12">
                <div className=" flex flex-col justify-around text-center">
                  <div className="w-full">
                    <h1 className=" text-2xl font-bold">{createItem.model}</h1>
                  </div>
                  <div>
                    <Image
                      className="rounded-lg"
                      src={createItem.pictureURL}
                      alt={`Image of ${createItem.model}`}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="rounded-lg bg-sky-100 p-1">
                    <h1 className=" text-xl font-bold text-sky-600">Available</h1>
                  </div>
                </div>
                <div className=" flex w-auto flex-col gap-4 pt-8">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className=" w-fit rounded-lg bg-gray-100 p-2">
                      <h1 className="text-xl font-bold">{createItem.category}</h1>
                    </div>
                    <div className="">
                      <h1 className="text-lg">
                        <span className="font-bold">From: </span>
                        {searchParams.get("pickupDate")}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex w-fit flex-row items-center rounded-lg bg-green-100 p-2 text-xl font-bold text-green-500">
                      <div className="text-2xl">
                        <MdAttachMoney />
                      </div>
                      {createItem.price}/day
                    </div>
                    <div>
                      <h1 className="text-lg">
                        <span className="font-bold">To: </span>
                        {searchParams.get("returnDate")}
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-fit flex-row items-center gap-1 rounded-lg bg-rose-100 p-2 text-xl font-bold">
                    <div>{searchParams.get("location")}</div>
                    <div className="">
                      <FaLocationDot />
                    </div>
                  </div>
                  <h1 className="text-lg">
                    <span className="font-bold">Additional Features: </span>{" "}
                    {additionalFeaturesArr?.join(", ")}
                  </h1>
                </div>
              </div>
              <div className="ml-6 flex flex-row items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold"> Extra Services: </h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="insurance"
                          value="Insurance"
                          className="mr-2"
                          onChange={handleCheckboxChange}
                        />
                        <span className="mr-2">Insurance</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="gps"
                          value="GPS"
                          className="mr-2"
                          onChange={handleCheckboxChange}
                        />
                        <span className="mr-2">GPS Navigation</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="wifi"
                          value="Wifi"
                          className="mr-2"
                          onChange={handleCheckboxChange}
                        />
                        <span className="mr-2">Wifi HotSpot</span>
                      </label>
                    </div>
                  </form>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-sky-700 px-6 py-2 font-bold text-white hover:bg-sky-500"
                  >
                    <FaCartArrowDown />
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>

            <input
              type="text"
              className="hidden"
              name={"vehicleID"}
              placeholder={"vehicleID"}
              defaultValue={createItem._id}
              key={"vehicleID"}
              readOnly
            />
            <input
              type="text"
              className="hidden"
              name={"userID"}
              placeholder={"userID"}
              defaultValue={actions.user.user.email}
              key={"userID"}
              readOnly
            />
            <input
              type="text"
              className="hidden"
              name={"pickupDate"}
              placeholder={"pickupDate"}
              defaultValue={searchParams.get("pickupDate") || ""}
              key={"pickupDate"}
              readOnly
            />
            <input
              type="text"
              className="hidden"
              name={"endDate"}
              placeholder={"endDate"}
              defaultValue={searchParams.get("returnDate") || ""}
              key={"endDate"}
              readOnly
            />
            <input
              type="text"
              className="hidden"
              name={"extraFeatures"}
              placeholder={"extraFeatures"}
              defaultValue={"none"}
              key={"extraFeatures"}
              readOnly
            />
          </Provider>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
