import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Filter } from "../components/FiltersPanel/Filter";
import { MainContext } from "../context/MainContext";

const mockSetContinent = jest.fn();

const defaultContext = {
  search: "",
  setSearch: jest.fn(),
  continent: "",
  setContinent: mockSetContinent,
  sortBy: "name" as const,
  setSortBy: jest.fn(),
  units: "℃" as const,
  setUnits: jest.fn(),
  chosenCity: null,
  setChosenCity: jest.fn(),
  userLocation: null,
  setUserLocation: jest.fn(),
};

const renderWithContext = (continent = "", continents = ["Europe", "Asia"]) => {
  return render(
    <MainContext.Provider value={{ ...defaultContext, continent, setContinent: mockSetContinent }}>
      <Filter continents={continents} />
    </MainContext.Provider>
  );
};

describe("Filter component", () => {
  beforeEach(() => {
    mockSetContinent.mockClear();
  });

  it("renders all options including 'Everywhere'", () => {
    renderWithContext();
    expect(screen.getByText("Everywhere")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
  });

  it("calls setContinent when a new option is selected", () => {
    renderWithContext();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Asia" } });
    expect(mockSetContinent).toHaveBeenCalledWith("Asia");
  });
}); 