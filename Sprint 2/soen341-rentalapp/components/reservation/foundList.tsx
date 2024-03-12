import { getAllAvailableVehicles } from "@/lib/actions/vehicleCRUD";
import VehicleCard from "./VehicleCard";

export default async function VehicleList({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { vehicles, count, totalPage } = await getAllAvailableVehicles(searchParams);

  return (
    <div>
      <div className="mb-12 flex w-full items-center justify-between p-8">
        <h1 className="text-4xl font-bold antialiased">Choose your vehicle!</h1>
        <div className="rounded-lg bg-gray-200 p-2">
          <h3 className="font-bold">{count} Vehicles Found</h3>
        </div>
      </div>
      <div className=" w-max">
        <div className="grid grid-cols-3 grid-rows-3 items-center gap-10">
          {vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
}
