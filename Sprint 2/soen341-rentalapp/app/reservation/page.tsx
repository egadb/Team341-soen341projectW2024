import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ReservationForm() {
  const user = await getUserSession();
  if (!user) redirect("/");
  return <ReservationForm />;
}
