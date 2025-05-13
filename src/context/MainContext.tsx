import { createContext, PropsWithChildren, useState } from "react";
import { City } from "../types/types";

interface MainContextType {
  search: string;
  setSearch: (search: string) => void;
  continent: string;
  setContinent: (continent: string) => void;
  sortBy: "name" | "distance";
  setSortBy: (sortBy: "name" | "distance") => void;
  units: "℃" | "℉";
  setUnits: (units: "℃" | "℉") => void;
  chosenCity: City | null;
  setChosenCity: (chosenCity: City | null) => void;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
}

export const MainContext = createContext<MainContextType>({
  search: "",
  setSearch: () => {},
  continent: "",
  setContinent: () => {},
  sortBy: "name",
  setSortBy: () => {},
  units: "℃",
  setUnits: () => {},
  chosenCity: null,
  setChosenCity: () => {},
  userLocation: null,
  setUserLocation: () => {},
});

export const MainContextProvider = (props: PropsWithChildren) => {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "distance">("name");
  const [units, setUnits] = useState<"℃" | "℉">("℃");
  const [chosenCity, setChosenCity] = useState<City | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <MainContext.Provider value={{ 
      search, 
      setSearch, 
      continent, 
      setContinent, 
      sortBy, 
      setSortBy, 
      units, 
      setUnits, 
      chosenCity, 
      setChosenCity,
      userLocation,
      setUserLocation
    }}>
      {props.children}
    </MainContext.Provider>
  );
};