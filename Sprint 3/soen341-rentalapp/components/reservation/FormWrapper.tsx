"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Provider from "../form/Provider";
import Spinner from "../form/Spinner";
import { useEditItemContext } from "../global/Provider";
import { MdAttachMoney } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormWrapper(actions: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  const searchParams = useSearchParams();
  const [ additionalServices, setAdditionalServices ] = useState<string[]>([]);
  const router = useRouter();

  let featuresString = searchParams.get("additionalFeatures");
  let additionalFeaturesArr = featuresString?.split(",")

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalServices([...additionalServices, value]);
    } else {
      setAdditionalServices(additionalServices.filter((services) => services !== value));
    }
  };

  const handleSubmit = () => {
    console.log(additionalServices);

    router.push(
      `/availabilityAndPrice?carId=${""}&branch=${searchParams.get("location")}&category=${searchParams.get("category")}&priceRange=${searchParams.get("priceRange")}&pickupDate=${searchParams.get("pickupDate")}&returnDate=${searchParams.get("returnDate")}&additionalFeatures=${searchParams.get("additionalFeatures")}&additionalServices=${additionalServices}`
    );
  }

  return (
    <div>
      {createItem ? (
        <div className="fixed left-0 top-0 h-full w-full bg-white/60 px-96 py-52">
          <Provider formAction={handleSubmit}>
            <div className=" w-fit flex flex-col rounded-lg bg-white p-4 gap-8">
              <div>
                  <button
                    onClick={() => setCreateItem(undefined)}
                    className="cursor-pointer text-4xl font-bold text-red-700 hover:text-red-500"
                  >
                    <BsArrowLeftCircle/>
                  </button>
              </div>
              <div className="flex flex-row gap-12">
                <div className=" flex flex-col text-center justify-around">
                  <div className="w-full">
                    <h1 className=" text-2xl font-bold">{createItem.model}</h1>
                  </div>
                  <div >
                      <Image
                        className="rounded-lg"
                        src={createItem.pictureURL}
                        alt={`Image of ${createItem.model}`}
                        width={300}
                        height={300}
                      />
                  </div>
                  <div className="bg-sky-100 p-1 rounded-lg">
                    <h1 className=" font-bold text-sky-600 text-xl">
                      Available
                    </h1>
                  </div>
                </div>
                <div className=" w-auto pt-8 flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center gap-4">
                    <div className=" w-fit p-2 rounded-lg bg-gray-100">
                      <h1 className="text-xl font-bold">
                        {createItem.category}
                      </h1>
                    </div>
                    <div className="">
                      <h1 className="text-lg">
                        <span className="font-bold">From: </span>{searchParams.get("pickupDate")}
                      </h1>
                    </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center w-fit p-2 rounded-lg text-xl font-bold text-green-500 bg-green-100">
                        <div className="text-2xl">
                          <MdAttachMoney />
                        </div>
                        {createItem.price}/day
                      </div>
                      <div>
                        <h1 className="text-lg">
                          <span className="font-bold">To: </span>{searchParams.get("returnDate")}
                        </h1>
                      </div>
                    </div>
                    <div className="w-fit text-xl flex flex-row items-center font-bold gap-1 p-2 bg-rose-100 rounded-lg">
                      <div>{searchParams.get("location")}</div>
                      <div className=""><FaLocationDot /></div>
                    </div>
                    {/* <h1 className="text-lg">
                      <span className="font-bold">Additional Features: </span> {additionalFeaturesArr?.join(", ")}
                    </h1> */}
                </div>
              </div>
              <div className="ml-6 flex flex-row justify-between items-center">
                <div>
                  <h1 className="font-bold text-lg"> Extra Services: </h1>
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
                    className="cursor-pointer rounded-lg bg-sky-700 hover:bg-sky-500 px-6 py-2 font-bold text-white flex flex-row items-center gap-2"
                  >
                    <FaCartArrowDown/>
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
