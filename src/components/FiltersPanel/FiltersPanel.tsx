import { styled } from "styled-components";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";

const FiltersPanelView = styled.div`  
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 50%;
`;

interface Props {
  continents: string[];
}

export const FiltersPanel = (props: Props) => {
  return (
    <FiltersPanelView>
      <LeftSide>
        <Search />
        <Filter continents={props.continents} />
      </LeftSide>
    </FiltersPanelView>
  );
};
