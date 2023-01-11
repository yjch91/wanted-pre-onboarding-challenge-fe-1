import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import MainPage from '../Todo/MainPage';
import AuthCheckHoc from '../Todo/AuthCheckHoc';

function Router() {
  const AuthMainPage = AuthCheckHoc(MainPage);
  
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signUp" element={<SignUp />} />
      <Route path="/" element={<AuthMainPage />} />
      <Route path="/:id" element={<AuthMainPage />} />
    </Routes>
  );
}

export default Router;
