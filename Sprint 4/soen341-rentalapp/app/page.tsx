'use client'

import Image from "next/image";
import { Anton } from "next/font/google"
import Lottie from "lottie-react"
import animationData from "../public/assets/car-animation.json.json"
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import carIcon from "../public/icons/transport.png";
import loginIcon from "../public/icons/login.png";
import confirmIcon from "../public/icons/agreement.png";
import { FaArrowAltCircleRight } from "react-icons/fa";



const kanit = Anton({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-52">
      {/* <h1 className="text-center text-7xl font-bold text-green-600">
        Welcome to Rent-A-Koenigsegg
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div> */}

      <div className="flex flex-row justify-center items-center gap-56 mt-28 px-20">
        <div className="flex items-center">
          <div className="flex flex-col gap-10 max-w-3xl bg-blue-100 p-14 rounded-lg">
            <h1 className="font-bold text-7xl ">Welcome To <span className={`mr-1 text-7xl`}>Rental</span><span className={`${kanit.className} text-8xl font-bold text-blue-800`}>341</span></h1>
            <p className=" text-xl text-gray-500">Discover seamless travel. Choose from our diverse fleet, book effortlessly, and hit the road with confidence. Your adventure awaits!</p>
            <div className="flex flex-row gap-10">
              <button className="flex flex-row gap-2 items-center font-bold text-lg text-slate-200 w-max rounded-md bg-blue-800 hover:bg-blue-600 px-6 py-3">Book Ride <FaRegCheckCircle /></button>
              <button className="flex flex-row gap-2 items-center font-bold text-lg text-slate-700 w-max rounded-md border border-blue-700 hover:bg-blue-400 px-6 py-3">Learn More <IoIosArrowForward /></button> 

            </div>
          </div>
        </div>
          <Lottie className="max-w-2xl shadow-2xl" animationData={animationData}/>
      </div>
      <div className="flex flex-col items-center gap-8 mb-2">
        <h1 className={`font-bold text-2xl mb-6`}>Reserve Your Vehicle Now</h1>
        <h1 className={`${kanit.className} font-bold text-6xl`}>Quick & Easy car rental</h1>
        <div className="h-fit flex flex-row gap-44 mt-14">
          <div className="max-w-80 flex flex-col items-center gap-6 bg-sky-200 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
            src={loginIcon} 
            alt="Login Icon"
            className="w-20"
            />
            <h1 className="text-4xl font-bold">Sign In</h1>
            <p className="text-gray-500">Sign in to access exclusive benefits and streamline your booking process. With secure authentication, managing your reservations is quick and hassle-free.</p>
          </div>
          <div className="max-w-80 flex flex-col items-center gap-6 bg-sky-200 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
              src={carIcon} 
              alt="Car Icon"
              className="w-20"
              />
            <h1 className="text-4xl font-bold">Select Vehicle</h1>
            <p className="text-gray-500">Browse through our diverse vehicle options and find the perfect match for your journey. From compact cruisers to spacious SUVs, we've got something for every traveler.</p>
          </div>
          <div className="max-w-80 flex flex-col items-center gap-6 bg-sky-200 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
              src={confirmIcon} 
              alt="Confirm Icon"
              className="w-20"
              />
            <h1 className="text-4xl font-bold">Confirm</h1>
            <p className="text-gray-500">Finalize your vehicle choice now to secure your ride for the journey ahead. With a simple confirmation, your adventure awaits. Let's make it happen!</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Reviewd by customer</h1>
        <h1>Client's Testimonial</h1>
      </div>
    </div>
  );
}
