import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { GridCities } from "../components/GridCities";
import { MainContext } from "../context/MainContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockCitiesData = {
  cities: [
    { name: "Paris", continent: "Europe", active: true, country: "France" },
    { name: "Tokyo", continent: "Asia", active: true, country: "Japan" },
    { name: "Berlin", continent: "Europe", active: true, country: "Germany" },
    { name: "Sydney", continent: "Australia", active: true, country: "Australia" },
  ],
};

const defaultContext = {
  search: "",
  setSearch: jest.fn(),
  continent: "",
  setContinent: jest.fn(),
  sortBy: "name" as const,
  setSortBy: jest.fn(),
  units: "℃" as const,
  setUnits: jest.fn(),
  chosenCity: null,
  setChosenCity: jest.fn(),
  userLocation: null,
  setUserLocation: jest.fn(),
};

const renderWithProviders = (contextOverrides = {}, queryOverrides = {}) => {
  const queryClient = new QueryClient();
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => mockCitiesData,
  } as Response);

  return render(
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={{ ...defaultContext, ...contextOverrides }}>
        <GridCities />
      </MainContext.Provider>
    </QueryClientProvider>
  );
};

describe("GridCities filtering", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows all cities by default", async () => {
    renderWithProviders();
    expect(await screen.findByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Sydney")).toBeInTheDocument();
  });

  it("filters by continent", async () => {
    renderWithProviders({ continent: "Europe" });
    expect(await screen.findByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.queryByText("Tokyo")).not.toBeInTheDocument();
    expect(screen.queryByText("Sydney")).not.toBeInTheDocument();
  });

  it("filters by search", async () => {
    renderWithProviders({ search: "to" });
    expect(await screen.findByText("Tokyo")).toBeInTheDocument();
    expect(screen.queryByText("Paris")).not.toBeInTheDocument();
    expect(screen.queryByText("Berlin")).not.toBeInTheDocument();
    expect(screen.queryByText("Sydney")).not.toBeInTheDocument();
  });

  it("shows no results if nothing matches", async () => {
    renderWithProviders({ search: "zzz" });
    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });

  it("filters by both search and continent", async () => {
    renderWithProviders({ search: "be", continent: "Europe" });
    expect(await screen.findByText("Berlin")).toBeInTheDocument();
    expect(screen.queryByText("Paris")).not.toBeInTheDocument();
    expect(screen.queryByText("Tokyo")).not.toBeInTheDocument();
    expect(screen.queryByText("Sydney")).not.toBeInTheDocument();
  });
}); 