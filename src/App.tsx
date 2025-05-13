import React from 'react';
import styled from 'styled-components';
import { GridCities } from './components/GridCities';

const AppView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  html, body {
    padding: 0;
  }
`;

export const App = () => {
  return (
    <AppView>
      <GridCities />
    </AppView>
  );
}