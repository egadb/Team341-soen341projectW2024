"use client";
import { useEditItemContext } from "./Provider";

export default function CreateItemButton(newItem: any) {
  const { createItem, setCreateItem } = useEditItemContext();
  return (
    <div>
      <button
        onClick={() => setCreateItem(newItem.newItem)}
        className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white"
      >
        Create new
      </button>
    </div>
  );
}
