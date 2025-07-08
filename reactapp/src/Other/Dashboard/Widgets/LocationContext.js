// src/Other/Dashboard/Widgets/LocationContext.js
import React, { createContext, useContext, useState } from "react";
import locations from "./Data/Locations.json";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const firstKey = Object.keys(locations)[0];
  const [selected, setSelected] = useState(firstKey);

  return (
    <LocationContext.Provider value={{ selected, setSelected, locations }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
