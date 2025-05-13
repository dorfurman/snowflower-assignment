import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import styled from "styled-components";
import { CitiesData } from "../types/types";
import { CityCard } from "./CityCard";
import { FiltersPanel } from "./FiltersPanel/FiltersPanel";
import { MainContext } from "../context/MainContext";
import _ from "lodash";
import { CityModal } from "./CityModal";
import { LoadingSpinner } from "../assets/svgs/LoadingSpinner";

const GridCitiesView = styled.div`
  gap: 1rem;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 1rem;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const GridCities = () => {
  const { data, isLoading, isError } = useQuery<CitiesData>({
    queryKey: ["cities-query"],
    queryFn: () => fetch(process.env.PUBLIC_URL + "/data/data.json").then((res) => res.json()),
  });

  const { search, continent, sortBy, chosenCity, setChosenCity, userLocation } = useContext(MainContext);

  const continents = _.uniq(data?.cities.map((city) => city.continent));

  const cities = data?.cities
    .filter((city) => city.active)
    .filter(
      (city) =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.country.toLowerCase().includes(search.toLowerCase())
    )
    .filter((city) => continent === "" || city.continent === continent)
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "distance" && userLocation) {
        const distanceA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.coords.lat,
          a.coords.lng
        );
        const distanceB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.coords.lat,
          b.coords.lng
        );
        return distanceA - distanceB;
      }
      return 0;
    });

  return (
    <GridCitiesView>
      {isLoading && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}
      {isError && <h3>Error</h3>}
      {data && (
        <Content>
          <FiltersPanel continents={continents} />
          <Grid>
            {cities && cities.length > 0 ? cities.map((city, index) => (
                <CityCard key={`${city.name}-${index}`} city={city} onClick={() => setChosenCity(city)} />
              )) : <h3>_No results found_</h3>}
          </Grid>
        </Content>
      )}
      {chosenCity && <CityModal />}
    </GridCitiesView>
  );
};
