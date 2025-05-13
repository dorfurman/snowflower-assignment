import { styled } from "styled-components";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { SortBy } from "./SortBy";
import { Units } from "./Units";

const FiltersPanelView = styled.div`  
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  gap: 1rem;
  width: 50%;
`;

interface Props {
  continents: string[];
}

export const FiltersPanel = (props: Props) => {
  return (
    <FiltersPanelView>
        <Search />
        <Filter continents={props.continents} />
        <SortBy />
        <Units />
    </FiltersPanelView>
  );
};
