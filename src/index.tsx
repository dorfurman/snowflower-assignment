import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainContextProvider } from './context/MainContext';
import './styles.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);