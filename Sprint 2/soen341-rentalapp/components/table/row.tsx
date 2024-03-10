"use client";

import { deleteUser } from "@/lib/actions/usersActions";
import { deleteVehicle } from "@/lib/actions/vehicleCRUD";
import { useTransition } from "react";
import { useEditItemContext } from "../admin/Provider";

export default function TableRow(item: any) {
  let [isPending, startTransition] = useTransition();
  const { setEditItem } = useEditItemContext();
  item = item.item;

  async function handleDelete(_id: any) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/vehicles")) {
      if (window.confirm("Are you sure you want to delete this vehicle?")) {
        await deleteVehicle(_id);
      }
    } else if (currentPath.includes("/users")) {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await deleteUser(_id);
      }
    }
  }

  return (
    <tr className="border-2 py-3">
      {Object.entries(item).map(
        ([key, value]) =>
          key !== "password" && key !== "_id" && <td key={key}>{value as String}</td>
      )}
      <td className="text-center">
        <button
          onClick={() => setEditItem(item)}
          className="m-1 cursor-pointer rounded-lg bg-blue-600 px-2 py-2 font-bold text-white"
        >
          Edit
        </button>
        <button
          onClick={() => startTransition(() => handleDelete(item._id))}
          className="cursor-pointer rounded-lg bg-red-600 px-2 py-2 font-bold text-white"
        >
          {isPending ? "Loading..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}
