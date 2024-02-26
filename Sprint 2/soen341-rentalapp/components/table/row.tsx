"use client";

import { deleteUser } from "@/lib/actions/usersActions";
import { useTransition } from "react";
import { useEditItemContext } from "../admin/Provider";

export default function TableRow(item: any) {
  let [isPending, startTransition] = useTransition();
  const { setEditItem } = useEditItemContext();
  item = item.item;

  async function handleDelete(_id: any) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(_id);
    }
  }

  return (
    <div className="flex flex-row place-content-between items-center border-2 bg-white p-2">
      <div className="ml-24 flex flex-row gap-12">
        <h1>{item?.firstName + " " + item?.lastName}</h1>
        <h1>{item?.email}</h1>
        <h1>{item?.role}</h1>
      </div>
      <div className="mr-12 flex flex-row gap-4">
        <button
          onClick={() => setEditItem(item)}
          className="cursor-pointer rounded-lg bg-blue-600 px-2 py-2 font-bold text-white"
        >
          Edit
        </button>
        <button
          onClick={() => startTransition(() => handleDelete(item._id))}
          className="cursor-pointer rounded-lg bg-red-600 px-2 py-2 font-bold text-white"
        >
          {isPending ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
