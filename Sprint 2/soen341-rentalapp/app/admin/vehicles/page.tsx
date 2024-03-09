import Features from "@/components/admin/Features";
import FormWrapper from "@/components/admin/FormWrapper";
import Pagination from "@/components/admin/Pagination";
import TableRow from "@/components/table/row";
import { createVehicle, getAllVehicles, updateVehicle } from "@/lib/actions/vehicleCRUD";
import Vehicle from "@/models/vehicle";

export default async function VehiclesCrud({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { vehicles, count, totalPages } = await getAllVehicles(searchParams);
  const newVehicle = new Vehicle();
  const newVehicleJSON = {
    _id: newVehicle._id.toString(),
    model: newVehicle.model,
    type: newVehicle.type,
    category: newVehicle.category,
    price: newVehicle.price,
    pictureURL: newVehicle.pictureURL,
  };
  return (
    <div className="w-[80%]">
      <FormWrapper updateAction={updateVehicle} createAction={createVehicle}></FormWrapper>
      <div className="flex w-full flex-col rounded-lg px-12 py-4">
        <Features newItemModel={newVehicleJSON} />
        <table className="table-auto rounded-xl border bg-white">
          <thead>
            <tr>
              <th>Model</th>
              <th>Type</th>
              <th>Category</th>
              <th>Price</th>
              <th>Picture URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle._id} item={vehicle}></TableRow>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages && <Pagination totalPages={totalPages} />}
    </div>
  );
}
