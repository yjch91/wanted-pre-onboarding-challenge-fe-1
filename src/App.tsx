import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Router from './components/Router';
import "./styles/todoStyle.css";
import "./styles/signStyle.css";
import "./styles/common.css";
import "./styles/modal.css";

function App() {

  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
