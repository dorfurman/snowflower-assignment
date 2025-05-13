import { createContext, PropsWithChildren, useState } from "react";

interface MainContextType {
  search: string;
  setSearch: (search: string) => void;
  continent: string;
  setContinent: (continent: string) => void;
}

export const MainContext = createContext<MainContextType>({
  search: "",
  setSearch: () => {},
  continent: "",
  setContinent: () => {},
});

export const MainContextProvider = (props: PropsWithChildren) => {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");

  return (
    <MainContext.Provider value={{ search, setSearch, continent, setContinent }}>
      {props.children}
    </MainContext.Provider>
  );
};