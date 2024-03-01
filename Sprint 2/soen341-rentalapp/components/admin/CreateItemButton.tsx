"use client";
import { usePathname } from "next/navigation";
import { useEditItemContext } from "./Provider";

export default function CreateItemButton(params: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  const name = usePathname().split("/");
  return (
    <button
      onClick={() => setCreateItem(params.newItem)}
      className="max-w-[20%] cursor-pointer rounded-lg bg-green-600 px-6 py-2 font-bold text-white"
    >
      Create new {name[2].slice(0, -1)}
    </button>
  );
}
