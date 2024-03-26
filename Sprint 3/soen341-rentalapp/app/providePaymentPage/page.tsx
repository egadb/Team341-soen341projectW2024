import Provider from "@/components/form/Provider";
import Spinner from "@/components/form/Spinner";
import { handlePayment } from "@/lib/actions/paymentActions";
import { getUserSession } from "@/lib/session";

export default async function ProvidePaymentInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getUserSession();

  // const confirmation = async () => {
  //   alert("Payment information confirmed! An email has been sent to you!");
  // };

  return (
    <div className="grid h-screen place-items-center bg-sky-100">
      <div className="rounded-lg border-t-4 border-sky-900 bg-slate-100 p-5 shadow-lg">
        <h1 className="my-4 text-4xl font-bold">Provide Payment Information</h1>
        <Provider formAction={handlePayment}>
          <Spinner />
          <input
            type="text"
            className="hidden"
            name={"vehicleID"}
            placeholder={"vehicleID"}
            defaultValue={searchParams.vehicleID}
            key={"vehicleID"}
            readOnly
          />
          <input
            type="text"
            className="hidden"
            name={"userID"}
            placeholder={"userID"}
            defaultValue={session?.user?.email}
            key={"userID"}
            readOnly
          />
          <input
            type="text"
            className="hidden"
            name={"pickupDate"}
            placeholder={"pickupDate"}
            defaultValue={searchParams.pickupDate}
            key={"pickupDate"}
            readOnly
          />
          <input
            type="text"
            className="hidden"
            name={"endDate"}
            placeholder={"endDate"}
            defaultValue={searchParams.endDate}
            key={"endDate"}
            readOnly
          />
          <input
            type="text"
            className="hidden"
            name={"extraFeatures"}
            placeholder={"extraFeatures"}
            defaultValue={searchParams.extraFeatures}
            key={"extraFeatures"}
            readOnly
          />

          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="cardNumber"
            placeholder="Card Number"
            required
          />
          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="expiryDate"
            placeholder="Expiration Date"
            required
          />
          <input
            type="text"
            className="rounded-md border-2 p-3 text-gray-400"
            name="cvv"
            placeholder="CVV"
            required
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-sky-900 px-6 py-2 font-bold text-white hover:bg-sky-950"
          >
            Confirm
          </button>
        </Provider>
      </div>
    </div>
  );
}
