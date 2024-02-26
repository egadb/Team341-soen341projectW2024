"use client";
import Provider from "../form/Provider";
import Spinner from "../form/Spinner";
import { useEditItemContext } from "./Provider";

export default function FormWrapper(updateAction: any, createAction: any) {
  const { editItem, setEditItem, createItem, setCreateItem } = useEditItemContext();
  return (
    <div>
      {editItem ? (
        <div className="fixed z-[20] h-full w-[80%] bg-white/60 p-52">
          <Provider formAction={updateAction.updateAction}>
            <Spinner />
            {Object.entries(editItem).map(([key, value]) => (
              <input
                type="text"
                className="rounded-md border-2"
                name={key}
                placeholder={key}
                defaultValue={value as string}
                readOnly={key == "_id"}
              />
            ))}
            <button
              type="submit"
              className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white"
            >
              Update
            </button>
            <button
              onClick={() => setEditItem(undefined)}
              className="cursor-pointer bg-red-600 px-6 py-2 font-bold text-white"
            >
              Cancel
            </button>
          </Provider>
        </div>
      ) : createItem ? (
        <div className="fixed z-[20] h-full w-[80%] bg-white/60 p-52">
          <Provider formAction={updateAction.createAction}>
            <Spinner />
            {Object.entries(createItem).map(([key, value]) => (
              <input
                type="text"
                className="rounded-md border-2"
                name={key}
                placeholder={key}
                defaultValue={value as string}
                readOnly={key == "_id"}
              />
            ))}
            <button
              type="submit"
              className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white"
            >
              Create
            </button>
            <button
              onClick={() => setCreateItem(undefined)}
              className="cursor-pointer bg-red-600 px-6 py-2 font-bold text-white"
            >
              Cancel
            </button>
          </Provider>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
