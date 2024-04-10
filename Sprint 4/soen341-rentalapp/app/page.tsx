'use client'

import Image from "next/image"
import { Anton } from "next/font/google"
import Lottie from "lottie-react"
import animationData from "../public/assets/car-animation.json.json"
import animationData2 from "../public/assets/small-car-animation.json"
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCheckCircle, FaRegQuestionCircle } from "react-icons/fa";
import carIcon from "../public/icons/transport.png";
import loginIcon from "../public/icons/login.png";
import confirmIcon from "../public/icons/agreement.png";
import { InfiniteMovingCards } from "@/components/homepage/infinite-moving-cards";
import { testimonials } from "@/models/testimonials";
import Link from "next/link"


const kanit = Anton({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col gap-36">
      <div className="flex flex-row justify-center items-center gap-56 mt-28 px-20">
        <div className="flex items-center">
          <div className="flex flex-col gap-10 max-w-3xl bg-blue-100 p-14 rounded-lg">
            <h1 className="font-bold text-7xl">Welcome To <span className={`mr-1 text-7xl`}>Rental</span><span className={`${kanit.className} text-8xl font-bold text-blue-800`}>341</span></h1>
            <p className=" text-xl text-gray-500">Discover seamless travel. Choose from our diverse fleet, book effortlessly, and hit the road with confidence. Your adventure awaits!</p>
            <div className="flex flex-row gap-10">
              <Link href={"/register"} className="flex flex-row gap-2 items-center font-bold text-lg text-slate-200 w-max rounded-md bg-blue-700 hover:bg-blue-600 px-6 py-3"> Book Ride <FaRegCheckCircle /> </Link>
              <button className="flex flex-row gap-2 items-center font-bold text-lg text-slate-700 w-max rounded-md border border-blue-700 hover:bg-blue-500 px-6 py-3">Learn More <IoIosArrowForward /></button> 

            </div>
          </div>
        </div>
          <Lottie className="max-w-2xl shadow-2xl" animationData={animationData}/>
      </div>
      <div className="flex flex-col items-center gap-8 mb-2">
        <h1 className={`font-bold text-2xl mb-6`}>Reserve Your Vehicle Now</h1>
        <h1 className={`${kanit.className} font-bold text-6xl`}>Quick & Easy car rental</h1>
        <div className="h-fit flex flex-row gap-44 mt-14">
          <div className="max-w-80 flex flex-col items-center gap-6 bg-blue-100 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
            src={loginIcon} 
            alt="Login Icon"
            className="w-20"
            />
            <h1 className="text-4xl font-bold">Sign In</h1>
            <p className="text-gray-500">Sign in to access exclusive benefits and streamline your booking process. With secure authentication, managing your reservations is quick and hassle-free.</p>
          </div>
          <div className="max-w-80 flex flex-col items-center gap-6 bg-blue-100 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
              src={carIcon} 
              alt="Car Icon"
              className="w-20"
              />
            <h1 className="text-4xl font-bold">Select Vehicle</h1>
            <p className="text-gray-500">Browse through our diverse vehicle options and find the perfect match for your journey. From compact cruisers to spacious SUVs, we've got something for every traveler.</p>
          </div>
          <div className="max-w-80 flex flex-col items-center gap-6 bg-blue-100 px-5 py-6 rounded-lg border border-blue-600 shadow-xl">
            <Image 
              src={confirmIcon} 
              alt="Confirm Icon"
              className="w-20"
              />
            <h1 className="text-4xl font-bold">Confirm</h1>
            <p className="text-gray-500">Finalize your vehicle choice now to secure your ride for the journey ahead. With a simple confirmation, your adventure awaits. Let's make it happen!</p>
          </div>
        </div>
        <div className="mt-12">
        <Link href="/register" className="flex flex-row items-center px-12 font-bold text-xl bg-blue-700 hover:bg-blue-600 text-slate-100 rounded-lg">I'm Ready! <Lottie className=" max-w-20" animationData={animationData2}/></Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <h1 className={`font-bold text-2xl mb-6`}>Reviewed by customers</h1>
        <h1 className={`${kanit.className} font-bold text-6xl`}>Client's Testimonial</h1>
        <div className=" h-full rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 mb-16">
        <h1 className={`font-bold text-2xl mb-6`}>FAQ</h1>
        <h1 className={`${kanit.className} font-bold text-6xl`}>Frequently Asked Questions</h1>

        <div className="flex flex-row gap-40 mt-10">
          <Image 
          src={"https://www.motortrend.com/uploads/sites/10/2022/02/2022-tesla-model-s-plaid-4wd-5door-hatchback-angular-front.png"} 
          alt={"Home Car"}
          width={450}
          height={450}/>
          <div className="max-w-3xl">
            <div className="collapse collapse-arrow bg-blue-100">
              <input type="radio" name="my-accordion-2" defaultChecked /> 
              <div className="collapse-title text-xl font-bold flex flex-row items-center gap-2">
               1. How old do I need to be to rent a car <FaRegQuestionCircle className=" text-blue-500"/>
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-700">The minimum age requirement varies depending on the rental company and location. In most cases, you need to be at least 21 years old to rent a car. However, drivers under 25 may be subject to a young driver surcharge.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-blue-100">
              <input type="radio" name="my-accordion-2" /> 
              <div className="collapse-title text-xl font-bold flex flex-row items-center gap-2">
                2. What documents do I need to rent a car <FaRegQuestionCircle className=" text-blue-500"/>
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-500">You typically need a valid driver's license, a credit card in the renter's name for payment and security deposit purposes, and sometimes additional identification such as a passport or proof of address.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-blue-100">
              <input type="radio" name="my-accordion-2" /> 
              <div className="collapse-title text-xl font-bold flex flex-row items-center gap-2">
                3. Can I return the car to a different location <FaRegQuestionCircle className=" text-blue-500"/>
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-700">Many rental companies offer the option to return the car to a different location, also known as a one-way rental. However, this service may incur additional fees, and availability depends on factors such as location and vehicle availability.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-blue-100">
              <input type="radio" name="my-accordion-2" /> 
              <div className="collapse-title text-xl font-bold flex flex-row items-center gap-2">
                4. What insurance options are available for my rental car <FaRegQuestionCircle className=" text-blue-500"/>
              </div>
              <div className="collapse-content"> 
                <p className="text-gray-500">Rental car insurance options typically include Collision Damage Waiver (CDW), which covers damage to the rental vehicle, and Liability Insurance, which covers damage to other vehicles or property.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
