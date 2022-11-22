import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./css/authpage.css";

import PageLoader from "../components/ui/Loaders/PageLoader";

const Login = React.lazy(() => import("../components/auth/Login"));
const Signup = React.lazy(() => import("../components/auth/Signup"));
const AdminLogin = React.lazy(() => import("../components/auth/AdminLogin"));




const AuthPage = (props) => {
  return (
  <div className="auth-page container bg-accent-light rounded-20 mt-5 mx-auto p-3">
    <Suspense fallback={<PageLoader />}> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Suspense>
  </div>);
}

export default AuthPage;