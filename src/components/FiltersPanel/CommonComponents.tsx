import styled from "styled-components";

export const Button = styled.button<{ active: boolean }>`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  text-decoration: ${({ active }) => active ? "underline" : "none"};
  font-size: 1rem;
`;

export const Separator = styled.div`
  width: 2px;
  height: 50%;
  margin: auto 0;
  background-color: #000000;
`;