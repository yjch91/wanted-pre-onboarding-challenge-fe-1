import React from 'react';
import { Route, Routes } from "react-router-dom";
import SignUp from '../Page/Auth/SignUp';
import HomePage from '../Page/Home/HomePage';
import AuthCheckHoc from '../Page/Home/AuthCheckHoc';
import LoginCheckHoc from '../Page/Auth/LoginCheckHoc';
import Login from '../Page/Auth/Login';
import NotFound from '../Page/NotFound';

function Router() {
  const AuthHomePage = AuthCheckHoc(HomePage);
  const LoginPage = LoginCheckHoc(Login);
  const SignUpPage = LoginCheckHoc(SignUp)

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signUp" element={<SignUpPage />} />
      <Route path="/" element={<AuthHomePage />} />
      <Route path="/:id" element={<AuthHomePage />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default Router;
