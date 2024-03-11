import VehicleList from "@/components/reservation/foundList";
import { Suspense } from "react";

export default function ReservationPage() {
  return (
    <div className="h-full bg-sky-100 p-4">
      <div className="mx-auto flex max-w-max flex-col items-center">
        <Suspense>
          <VehicleList />
        </Suspense>
      </div>
    </div>
  );
}
