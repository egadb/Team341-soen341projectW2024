"use client";
import spinner from "@/public/icons/spinner.svg";
import Image from "next/image";
import { useFormStatus } from "react-dom";

export default function Spinner() {
  const { pending } = useFormStatus();

  return (
    <div className="z-8 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      {pending && <Image src={spinner} width={30} height={30} alt="loading"></Image>}
    </div>
  );
}
