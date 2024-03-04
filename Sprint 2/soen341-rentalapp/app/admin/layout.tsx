import { Provider } from "@/components/admin/Provider";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] w-full flex-row">
      <div className="flex h-full w-[20%] flex-col items-center bg-white">
        <h1 className="p-3 text-xl font-bold">Welcome to the admin dashboard!</h1>
        <Link className="w-full border-t-4 p-3 text-center text-lg" href="/admin/users">
          Users CRUD
        </Link>
        <Link className="w-full border-t-4 p-3 text-center text-lg" href="/admin/reservations">
          Reservations CRUD
        </Link>
        <Link className="w-full border-t-4 p-3 text-center text-lg" href="/admin/vehicles">
          Vechicles CRUD
        </Link>
      </div>
      <Provider>{children}</Provider>
    </div>
  );
}
