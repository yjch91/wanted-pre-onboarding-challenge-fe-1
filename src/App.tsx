import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import "./styles/todoStyle.css";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MainPage />} />
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
