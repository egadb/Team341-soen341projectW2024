import Features from "@/components/admin/Features";
import FormWrapper from "@/components/admin/FormWrapper";
import Pagination from "@/components/admin/Pagination";
import TableRow from "@/components/table/row";
import { createReservation, getAllReservations, updateReservation } from "@/lib/actions/reservationActions";
import Reservation from "@/models/reservation";

export default async function ReservationsCrud({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { reservations, count, totalPage } = await getAllReservations(searchParams);
  const newReservation = new Reservation();
  const newReservationJSON = {
    _id: newReservation._id.toString(),
    userID: newReservation.userID,
    vehicleID: newReservation.vehicleID,
    pickupDate: newReservation.pickupDate,
    endDate: newReservation.endDate,
    extraFeatures: newReservation.extraFeatures,
  };
  return (
    <div className="w-[80%]">
      <FormWrapper updateAction={updateReservation} createAction={createReservation}></FormWrapper>
      <div className="flex w-full flex-col rounded-lg px-12 py-4">
        <Features newItemModel={newReservationJSON} />
        <table className="table-auto rounded-xl border bg-white">
          <thead>
            <tr>
              <th>userID</th>
              <th>vehicleID</th>
              <th>pickupDate</th>
              <th>endDate</th>
              <th>extraFeatures</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <TableRow key={reservation._id} item={reservation}></TableRow>
            ))}
          </tbody>
        </table>
      </div>
      {totalPage && <Pagination totalPage={totalPage} />}
    </div>
  );
}
