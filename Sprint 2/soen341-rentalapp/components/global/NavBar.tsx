"use client";

import Link from "next/link";

interface NavBarButtonProps {
  name: string;
  path: string;
}

function NavBarButton({ name, path }: NavBarButtonProps) {
  return (
    <div className="p-4">
      <Link href={path}>
        <button className="rounded-md bg-green-600 px-4 py-2 font-bold text-white">{name}</button>
      </Link>
    </div>
  );
}

export default function NavBar() {
  return (
    <div className="flex " style={{ backgroundColor: "#1a202c", width: "100%" }}>
      <nav className="flex items-center py-4">
        <Link href="/browse-vehicles">
          <h1 className="cursor-pointer p-4 text-2xl font-bold">Car Rental</h1>
        </Link>
        <NavBarButton name="Login" path="/login" />
        <NavBarButton name="Register" path="/register" />
        <NavBarButton name="Browse Vehicles" path="/browse-vehicles" />
      </nav>
    </div>
  );
}
