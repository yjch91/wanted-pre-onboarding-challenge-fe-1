import React from 'react';
import { Route, Routes } from "react-router-dom";
import SignUp from '../Auth/SignUp';
import MainPage from '../Todo/MainPage';
import AuthCheckHoc from '../Todo/AuthCheckHoc';
import LoginCheckHoc from '../Auth/LoginCheckHoc';
import Login from '../Auth/Login';

function Router() {
  const AuthMainPage = AuthCheckHoc(MainPage);
  const LoginPage = LoginCheckHoc(Login);
  const SignUpPage = LoginCheckHoc(SignUp)
  
  

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signUp" element={<SignUpPage />} />
      <Route path="/" element={<AuthMainPage />} />
      <Route path="/:id" element={<AuthMainPage />} />
    </Routes>
  );
}

export default Router;
