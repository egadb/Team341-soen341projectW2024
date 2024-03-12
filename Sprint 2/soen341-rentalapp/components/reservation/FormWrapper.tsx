"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Provider from "../form/Provider";
import Spinner from "../form/Spinner";
import { useEditItemContext } from "../global/Provider";

export default function FormWrapper(actions: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  const searchParams = useSearchParams();
  return (
    <div>
      {createItem ? (
        <div className="fixed left-0 top-0 h-full w-full bg-white/60 px-80 py-52">
          <Provider formAction={actions.createAction}>
            <div className="flex flex-row items-center rounded-lg bg-white p-2">
              <Image
                className="rounded-lg"
                src={createItem.pictureURL}
                alt={`Image of ${createItem.model}`}
                width={200}
                height={200}
              />
              <div className="flex w-full flex-col p-5">
                <h1 className="text-center text-xl font-bold">{createItem.model}</h1>
                <h1 className="text-lg">
                  <span className="font-bold">Type: </span>
                  {createItem.type}
                </h1>
                <h1 className="text-lg">
                  <span className="font-bold">Category: </span>
                  {createItem.category}
                </h1>
                <h1 className="text-lg">
                  <span className="font-bold">Price: </span>${createItem.price}
                </h1>
              </div>
            </div>
            <Spinner />
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
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-green-600 px-6 py-2 font-bold text-white"
            >
              Reserve this car
            </button>
            <button
              onClick={() => setCreateItem(undefined)}
              className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-bold text-white"
            >
              Cancel
            </button>
          </Provider>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
