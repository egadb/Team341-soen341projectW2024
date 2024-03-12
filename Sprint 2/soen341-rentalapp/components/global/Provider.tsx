"use client";

import React, { useState } from "react";

const Context = React.createContext<editItemContextValue | undefined>(undefined);

export const useEditItemContext = () => {
  const editItemContext = React.useContext(Context);
  if (editItemContext === undefined) {
    throw new Error("useOnboardingContext must be inside a editItemContextProvider");
  }
  return editItemContext;
};

export const Provider = ({ children }: any) => {
  const [editItem, setEditItem] = useState();
  const [createItem, setCreateItem] = useState();

  const value = { editItem, setEditItem, createItem, setCreateItem };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

interface editItemContextValue {
  editItem: undefined;
  setEditItem: React.Dispatch<React.SetStateAction<undefined>>;
  createItem: any;
  setCreateItem: React.Dispatch<React.SetStateAction<undefined>>;
}
