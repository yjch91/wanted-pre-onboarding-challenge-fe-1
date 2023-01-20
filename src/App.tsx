import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Router from './components/Router';
import "./styles/todoStyle.css";
import "./styles/signStyle.css";
import "./styles/common.css";
import "./styles/modal.css";
import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';
import { Provider } from 'react-redux';

function App() {

  const queryClient = new QueryClient();
  const store = createStore(rootReducer);
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
