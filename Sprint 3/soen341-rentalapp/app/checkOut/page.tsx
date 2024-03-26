import Spinner from "@/components/form/Spinner";
import { Provider } from "@/components/global/Provider";
import { deleteReservation, getUserReservations } from "@/lib/actions/reservationActions";
import { getUserSession } from "@/lib/session";

export default async function ReturnForm() {
  const session: any = await getUserSession();
  if (!session)
    return (
      <div className="flex h-screen font-bold text-red-500">Session Expired! Please Log In</div>
    );
  const userReservations = await getUserReservations(session.user.email);
  if (userReservations.reservations.length == 0)
    return (
      <div className="flex h-screen font-bold text-red-500">You do not have any reservations!</div>
    );
  else {
    const price = userReservations.reservations[0].price;
    const id = userReservations.reservations[0]._id;
    return (
      <div className="flex h-screen items-center justify-center bg-sky-100 p-8">
        <div className="flex flex-col gap-4 rounded-lg border-t-4 border-sky-900 bg-slate-100 p-10">
          <Provider formAction={deleteReservation(id)}>
            <Spinner />
            <div>
              <h1 className="text-4xl font-bold">Car Return Form</h1>
            </div>
            <div className="flex flex-col py-10">
              <p className="font-bold">
                To proceed with your vehicle return, please confirm the return below and fill in
                your payment details.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="confirmReturn"
                name="Confirm Return"
                className="h-6 w-6 accent-sky-900"
              />
              <label htmlFor="confirmReturn" className="font-bold">
                I confirm the return of the vehicle, free of damage.
              </label>
            </div>

            <div className="py-4">
              <p>
                Your calculated price for the return service is: <strong>${price}</strong>
              </p>
            </div>

            <input
              className="rounded-lg p-3 shadow-inner"
              type="text"
              id="creditCardNumber"
              name="Credit Card Number"
              placeholder="Enter your Credit Card Number"
            />
            <input
              className="rounded-lg p-3 shadow-inner"
              type="text"
              id="expirationDate"
              name="Expiration Date"
              placeholder="MM/YY"
            />
            <input
              className="rounded-lg p-3 shadow-inner"
              type="text"
              id="cvv"
              name="CVV"
              placeholder="CVV"
            />
            <button
              className="rounded bg-sky-900 p-2 text-white shadow duration-300 hover:bg-sky-950"
              type="submit"
            >
              Confirm Return and Pay
            </button>
          </Provider>
        </div>
      </div>
    );
  }
}
