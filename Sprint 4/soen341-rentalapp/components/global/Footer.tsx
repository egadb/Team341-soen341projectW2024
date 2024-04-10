"use client";

import Lottie from "lottie-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import animationData2 from "../../public/assets/small-car-animation.json"

export default function Footer() {
  return (
    <footer className="footer footer-center gap-3 pt-10 px-10 text-slate-100 bg-blue-800">
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a><FaTwitter /></a>
          <a><FaLinkedin /></a>
          <a><FaFacebook /></a>
        </div>
      </nav> 
      <aside>
        <p>Copyright © 2024 - All right reserved by Rental341</p>
      </aside>
      <Lottie className="max-w-20" animationData={animationData2}/>
    </footer>
  );
}
