import FormWrapper from "@/components/admin/FormWrapper";
import { Provider } from "@/components/global/Provider";
import TableRow from "@/components/table/row";
import { getUserReservations, updateReservation } from "@/lib/actions/reservationActions";
import { getUserSession } from "@/lib/session";

export default async function myReservations() {
  const session: any = await getUserSession();
  if (!session) return <div className="flex h-screen text-red-500 font-bold">Session Expired! Please Log In</div>;
  const userReservations = await getUserReservations(session.user.email);
  return (
    <div className="flex h-screen w-full flex-col rounded-lg px-12 py-4">
      <h1 className="p-5 text-5xl font-bold">My Reservations</h1>
      <Provider>
        <FormWrapper updateAction={updateReservation}></FormWrapper>
        <table className="table-auto rounded-xl border bg-white">
          <thead>
            <tr>
              <th>userID</th>
              <th>vehicleID</th>
              <th>pickupDate</th>
              <th>endDate</th>
              <th>extraFeatures</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {userReservations.reservations.map((reservation: any) => (
              <TableRow key={reservation._id} item={reservation}></TableRow>
            ))}
          </tbody>
        </table>
      </Provider>
    </div>
  );
}
