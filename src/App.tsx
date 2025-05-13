import React from 'react';
import styled from 'styled-components';
import { GridCities } from './components/GridCities';

const AppView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const App = () => {
  return (
    <AppView>
      <GridCities />
    </AppView>
  );
}