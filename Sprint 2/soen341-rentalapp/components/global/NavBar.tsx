"use client";

import { signOut } from "next-auth/react";
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
export default async function NavBar({ session }: any) {
  return (
    <div
      className="flex"
      style={{
        backgroundColor: "#1a202c",
        width: "100%",
        top: 0,
        overflowY: "auto",
      }}
    >
      <nav className="flex items-center py-4">
        <Link href="/">
          <h1 className="cursor-pointer p-4 text-2xl font-bold text-white">Car Rental</h1>
        </Link>
        {!session && <NavBarButton name="Login" path="/login" />}
        {!session && <NavBarButton name="Register" path="/register" />}
        {session && <NavBarButton name="Reserve" path="/reservation" />}
        <div className="p-4">
          {session && (
            <Link href={"/"}>
              <button
                className="rounded-md bg-green-600 px-4 py-2 font-bold text-white"
                name="Logout"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
