import { getAllVehicles } from "@/lib/actions/vehicleCRUD";

export default function BrowseVehicles() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "darkred",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Browse Vehicles</h2>
      </div>
    </div>
  );
}

const searchParams: { [key: string]: string | string[] | undefined } = {};
(async () => {
  const { vehicles, count, totalPages } = await getAllVehicles(searchParams);
  for (const vehicle of vehicles) {
    console.log(vehicle);
  }
})();
