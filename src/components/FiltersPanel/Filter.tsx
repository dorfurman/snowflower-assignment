import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { styled } from "styled-components";

const FilterView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

interface Props {
  continents: string[];
}

export const Filter = (props: Props) => {
  const { continent, setContinent } = useContext(MainContext);

  return (
    <FilterView>
      <h3>Continent</h3>
      <Select value={continent} onChange={(e) => setContinent(e.target.value)}>
        {props.continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </Select>
    </FilterView>
  );
};
