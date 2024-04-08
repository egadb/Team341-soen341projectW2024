"use client";

import { handleSearch } from "@/lib/actions/mapAPI";
import { useState } from "react";
import Spinner from "../form/Spinner";

const initialState = {
  duration1: "",
  duration2: "",
  duration3: "",
  nearestBranch: "",
};

export default function Provider() {
  const [durations, setDurations] = useState(initialState);

  return (
    <form
      action={async (data: FormData) => {
        try {
          const alo = await handleSearch(initialState, data);

          if (alo) {
            setDurations(alo);
          }
        } catch (e: unknown) {
          console.error(e);
        }
      }}
    >
      <form />
      <Spinner />
      {durations?.duration1 != "" && (
        <div>
          <p>{durations?.duration1} to Montreal Branch </p>
          <p>{durations?.duration2} to Laval Branch</p>
          <p>{durations?.duration3} to West Island Branch</p>
          <p>The nearest branch is located in: {durations?.nearestBranch}</p>
        </div>
      )}

      <input
        type="text"
        className="rounded-md border-2 p-3 text-gray-400 bg-white"
        name="postalCode"
        placeholder="Enter a Location"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-sky-900 px-6 py-2 font-bold text-white hover:bg-sky-950"
      >
        Search Nearest Branch
      </button>
    </form>
  );
}

interface FormProviderProps {
  children: React.ReactNode;
  formAction: any;
}
