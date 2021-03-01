import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react";
import { TechsStore } from "../TechsStore";

export const TechsContext = createContext(TechsStore);

export default function TechsProvider({ children }: any) {
  const techsStore = useLocalObservable(() => TechsStore);

  return (
    <TechsContext.Provider value={techsStore}>{children}</TechsContext.Provider>
  );
}

export const useTechsStore = () => useContext(TechsContext);
