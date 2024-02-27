"use client";
import { useEditItemContext } from "./Provider";

export default function CreateItemButton(newItem: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  return (
    <button
      onClick={() => setCreateItem(newItem.newItem)}
      className="mb-1 max-w-[20%] cursor-pointer rounded-lg bg-green-600 px-6 py-2 font-bold text-white"
    >
      Create new
    </button>
  );
}
