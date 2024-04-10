"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { BiLogIn, BiSolidSad } from "react-icons/bi";
import { FaCar, FaList, FaRegCalendarCheck, FaSearch } from "react-icons/fa";
import { IoIosHappy } from "react-icons/io";
import { MdLogout } from "react-icons/md";


export default function NavBar({ session }: any) {
  return (
    <div className="navbar bg-blue-800 p-3">
    <div className="navbar-start">
      {/* <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div> */}
      <a className="btn btn-ghost text-4xl text-slate-200" href="/">Rental341</a>
    </div>
    <div className="navbar-center gap-8 text-slate-100 font-bold hidden lg:flex">
      <ul className="menu menu-horizontal px-1 flex gap-2 items-center text-xl">
        <li><a href="/browse"> <FaSearch /> Browse</a></li>
        {session &&
          <li><a href="/reservation"><FaCar />Reservation</a></li>}
        {session &&
        <li>
          <details>
          <summary> <FaRegCalendarCheck /> Check In/Out</summary>
            <ul className="p-2 w-max bg-blue-800 flex flex-row">
              <li><a href="/checkIn"><IoIosHappy />Pick up</a></li>
              <li><a href="/checkOut"><BiSolidSad />Drop Off</a></li>
            </ul>
          </details>
        </li>}
        {session &&
        <li><a href="/myReservations"> <FaList />My Reservations</a></li>}
      </ul>
    </div>
    <div className="navbar-end flex gap-3 text-lg font-bold">
      {!session && 
          <Link href={"/login"}>
            <button className=" text-slate-100 p-3 bg-blue-600 hover:bg-blue-900 rounded-lg">Login</button>
          </Link>
      }
      {!session && 
            <Link href={"/register"}>
            <button className=" text-slate-100 btn-ghost p-3 rounded-lg">Sign In </button>
          </Link>
      }
      {session && (
            <button
              className=" text-slate-100 btn-ghost p-3 rounded-lg flex flex-row items-center gap-2"
              name="Logout"
              onClick={() => signOut()}
            >
              Logout
              <MdLogout className="text-xl"/>
            </button>
        )}
      
    </div>
  </div>
    // <div
    //   className="flex"
    //   style={{
    //     backgroundColor: "#1a202c",
    //     width: "100%",
    //     top: 0,
    //     overflowY: "auto",
    //   }}
    // >
    //     <Link href="/">
    //       <h1 className="cursor-pointer p-4 text-2xl font-bold text-white">Car Rental</h1>
    //     </Link>
    //     {!session && <NavBarButton name="Login" path="/login" />}
    //     {!session && <NavBarButton name="Register" path="/register" />}
    //     {session && <NavBarButton name="Reserve" path="/reservation" />}
    //     {session && <NavBarButton name="Time To Pick Up!" path="/checkIn" />}
    //     {!session && <NavBarButton name="My Reservations" path="/myReservations" />}
    //     {session && <NavBarButton name="Time To Drop Off!" path="/checkOut" />}
    //     <div className="p-4">
    //       {session && (
    //         <button
    //           className="rounded-md bg-green-600 px-4 py-2 font-bold text-white"
    //           name="Logout"
    //           onClick={() => signOut()}
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </div>
    // </div>
  );
}
