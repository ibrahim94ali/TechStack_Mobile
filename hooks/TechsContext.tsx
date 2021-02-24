import React, { useState, useEffect, createContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_TECHS } from "../graphQL/Queries";
import { TechnologyI } from "../types";

export const TechsContext = createContext<TechnologyI[]>([]);

export default function TechsProvider({ children }: any) {
  //getting techs
  const { error, loading, data } = useQuery(GET_TECHS);
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    if (data) {
      setTechs(data.technologies);
    }
  }, [data]);

  return (
    <TechsContext.Provider value={techs}>{children}</TechsContext.Provider>
  );
}
