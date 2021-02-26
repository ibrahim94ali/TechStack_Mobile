import React, { createContext, useContext } from "react";
import { useLocalObservable, useLocalStore } from "mobx-react";
import { createTechsStore } from "../TechsStore";

export const TechsContext = createContext(createTechsStore());

export default function TechsProvider({ children }: any) {
  const techsStore = useLocalStore(createTechsStore);
  // const techsStore = useLocalObservable(createTechsStore);

  return (
    <TechsContext.Provider value={techsStore}>{children}</TechsContext.Provider>
  );
}

export const useTechsStore = () => useContext(TechsContext);
