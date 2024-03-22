import { Provider } from "@/components/global/Provider";
import FormWrapper from "@/components/reservation/FormWrapper";
import VehicleCard from "@/components/reservation/VehicleCard";
import { createReservationUser } from "@/lib/actions/reservationActions";
import { getAllAvailableVehicles } from "@/lib/actions/vehicleCRUD";
import { getUserSession } from "@/lib/session";

export default async function ReservationPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { vehicles, count } = await getAllAvailableVehicles(searchParams);
  const session = await getUserSession();
  return (
    <div className="h-full bg-sky-100 p-4">
      <div className="mx-auto flex max-w-max flex-col items-center">
        <div>
          <div className="mb-12 flex w-full items-center justify-between p-8 gap-5">
            <h1 className="text-4xl font-bold antialiased">Choose your vehicle!</h1>
            <div className="rounded-lg bg-gray-200 p-2">
              <h3 className="font-bold">{count} Vehicles Found</h3>
            </div>
          </div>
          <Provider className="w-full">
            <FormWrapper createAction={createReservationUser} user={session} />
            <div className="grid grid-cols-3 grid-rows-3 items-center gap-10">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          </Provider>
        </div>
      </div>
    </div>
  );
}
