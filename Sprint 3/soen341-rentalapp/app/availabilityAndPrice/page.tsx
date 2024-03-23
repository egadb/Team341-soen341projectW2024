"use client";

import { Schema } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function availabilityAndPrice({
  carId,
  pickupDate,
  dropoffDate,
  additionalFeatures,
  branch,
}: {
  carId: Schema.Types.ObjectId;
  pickupDate: Date;
  dropoffDate: Date;
  additionalFeatures: string[];
  branch: string;
}) {
  const dateOfPickup = new Date("2022-03-01"); //hardcoding for now
  const formattedPickupDate = dateOfPickup.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dateOfDropoff = new Date("2022-03-02"); //hardcoding for now
  const formattedDropoffDate = dateOfDropoff.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const chosenBranch = "Montreal";
  //hardcoding for now
  const isAvailable = true;
  //const featuresStr = additionalFeatures.join(', ');
  const featuresStr = "Sunroof, Leather seats, Heated seats, Backup camera";
  const carPrice = 50;
  const pictureUrl =
    "https://www.motortrend.com/uploads/sites/10/2022/02/2022-tesla-model-3-standard-range-plus-sedan-angular-front.png";
  //if (!session) return <div>Session Expired! Please Log In</div>;
  const router = useRouter();

  const onConfirm = () => {
    router.push(
      `/providePaymentPage?carId=${"cardIdMock"}&pickupDate=${dateOfPickup.toString()}&dropoffDate=${dateOfDropoff.toString()}
       &featuresStr=${featuresStr}&branch=${branch}`
    );
  };

  return isAvailable ? (
    <div className="h-screen bg-sky-100">
      <div className="ml-40 flex justify-center">
        <div className="w-1/2">
          <table className="mt-20 w-full">
            <tbody>
              <tr>
                <td className="py-2 text-4xl font-bold">Reservation Details</td>
                <td className="py-2 text-4xl font-bold">Info</td>
              </tr>
              <tr>
                <td className="py-2">Pickup and Dropoff Location</td>
                <td className="py-2">{chosenBranch}</td>
              </tr>
              <tr>
                <td className="py-2">Pickup Date</td>
                <td className="py-2">{formattedPickupDate}</td>
              </tr>
              <tr>
                <td className="py-2">Dropoff Date</td>
                <td className="py-2">{formattedDropoffDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <table className="mt-20 w-full">
            <tbody>
              <tr>
                <td className="py-2 text-4xl font-bold">Expense Category</td>
                <td className="py-2 text-4xl font-bold">Price</td>
              </tr>
              <tr>
                <td className="py-2">Car (without additional features)</td>
                <td className="py-2">50$</td> {/*get car price here multiplied by days of rental*/}
              </tr>
              {/*only render if user chose sunroof*/}
              <tr>
                <td className="py-2">Sunroof</td>
                <td className="py-2">50$</td>
              </tr>
              {/*only render if user chose leather seats*/}
              <tr>
                <td className="py-2">Leather seats</td>
                <td className="py-2">50$</td>
              </tr>
              {/*only render if user chose heated seats*/}
              <tr>
                <td className="py-2">Heated seats</td>
                <td className="py-2">50$</td>
              </tr>
              {/*only render if user chose backup camera*/}
              <tr>
                <td className="py-2">Backup camera</td>
                <td className="py-2">50$</td>
              </tr>
              <tr>
                <td className="py-2">Total</td>
                <td className="py-2">250$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center">
        <img src={pictureUrl} className="h-auto w-1/4" />
        <div className="mt-4 flex justify-center">
          <Link href={"/"}>
            {/*goes back to home page for now, fix this*/}
            <button className="rounded bg-red-500 px-4 py-2 text-white">Go Back</button>
          </Link>
          <button onClick={onConfirm} className="ml-4 rounded bg-green-500 px-4 py-2 text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="grid h-screen place-items-center bg-sky-100">
      <Link href={"/"}>
        <div className="flex flex-col items-center">
          <div>Car is not available!</div>
          {/*goes back to home page for now, fix this*/}
          <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white">Go Back</button>
        </div>
      </Link>
    </div>
  );
}
