import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import styled from "styled-components";
import { CitiesData } from "../types/types";
import { CityCard } from "./CityCard";
import { FiltersPanel } from "./FiltersPanel/FiltersPanel";
import { MainContext } from "../context/MainContext";
import _ from "lodash";

const GridCitiesView = styled.div`
  gap: 1rem;
  padding: 1rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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

export const GridCities = () => {
  const { data, isLoading, isError } = useQuery<CitiesData>({
    queryKey: ["cities-query"],
    queryFn: () => fetch("/data/data.json").then((res) => res.json()),
  });

  const { search, continent } = useContext(MainContext);

  const continents = _.uniq(data?.cities.map((city) => city.continent));

  return (
    <GridCitiesView>
      {isLoading && <Loader>Loading...</Loader>}
      {isError && <Error>Error</Error>}
      {data && (
        <Content>
          <FiltersPanel continents={continents} />
          <Grid>
            {data.cities
              .filter((city) => city.active)
              .filter(
                (city) =>
                  city.name.toLowerCase().includes(search.toLowerCase()) ||
                  city.country.toLowerCase().includes(search.toLowerCase())
              )
              .filter((city) => continent === "" || city.continent === continent)
              .map((city, index) => (
                <CityCard key={`${city.name}-${index}`} city={city} />
              ))}
          </Grid>
        </Content>
      )}
    </GridCitiesView>
  );
};
