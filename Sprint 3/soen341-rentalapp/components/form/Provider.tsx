"use client";

import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
const initialErrorState = {
  error: "",
};

export default function Provider({ children, formAction }: FormProviderProps) {
  const [state, rawFormAction] = useFormState(formAction, initialErrorState);
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
  let message = "";

  switch (reference) {
    case "register":
      message = "User created! Please login.";
  }

  return (
    <form action={rawFormAction} className="flex w-full flex-col gap-3">
      {message && (
        <div className="w-fit rounded-md bg-green-500 px-3 py-1 text-sm text-white">{message}</div>
      )}
      {children}
      {state?.error && (
        <div className="w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
          {state?.error}
        </div>
      )}
    </form>
  );
}

interface FormProviderProps {
  children: React.ReactNode;
  formAction: any;
}
