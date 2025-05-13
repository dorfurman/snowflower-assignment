import { useContext } from "react";
import { styled } from "styled-components";
import { MainContext } from "../../context/MainContext";

const SearchView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

export const Search = () => {
  const { search, setSearch } = useContext(MainContext);

  return (
    <SearchView>
      <h3>Search</h3>
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchView>
  );
};
