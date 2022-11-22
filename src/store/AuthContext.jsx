import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalLoader from "../components/ui/Loaders/GlobalLoader";

import { loginAPI, signUpAPI, refreshTokenAPI, changePasswordAPI, adminLoginAPI } from "../api/auth";


//=============================================================================================


const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  token: null,
  adminLogin: () => {},
  logout: () => {},
  login: () => {},
  signUp: () => {},
  changePassword: () => {},
});

export default AuthContext;


//=============================================================================================

export const AuthContextProvider = (props) => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  // Check if user is logged in
  useEffect(() => {
    const getUserData = async () => {
      let token = localStorage.getItem("token");
      let user = JSON.parse(localStorage.getItem("user"));
      let expiry = localStorage.getItem("expiry");
      if(token && user && expiry && parseInt(expiry) > Date.now()){
        let response = await refreshTokenAPI(token);
        if(response.status === "success") {
          setUser(user);
          setIsLoggedIn(true);
          setToken(response.data);
          if(user.name === "Admin") setIsAdmin(true);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiry');
      }
      setIsLoading(false);
    }

    getUserData();
  }, []);




  // Admin login
  const adminLogin = async (password) => {
    let res = await adminLoginAPI(password);
    if(res.status !== "success") return {message: res.message, success: false};
    setUser({name: "Admin", email: "admin@flight.com"});
    setIsLoggedIn(true);
    setIsAdmin(true);
    setToken(res.data);
    localStorage.setItem("token", res.data);
    localStorage.setItem("user", JSON.stringify({name: "Admin", email: "admin@flight.com"}));
    localStorage.setItem("expiry", Date.now() + 604800000); // 7 days
    return {message: "Logged in successfully", success: true};
  }


  // Login a user
  const login = async (email, password) => {
    let res = await loginAPI({email, password});
    if(res.status !== "success") return {message: res.message, success: false};
    let data = res.data;
    setToken(data.token);
    setUser(data.user);
    setIsLoggedIn(true);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("expiry", Date.now() + 604800000); // 7 days

    return {message: "Logged in successfully", success: true};
  };


  // Logout a user
  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    navigate("/");
  }


  // Sign up a user
  const signup = async (data) => {
    let res = await signUpAPI(data);
    if(res.status !== "success") return {message: res.message, success: false};
    return {message: "Signed up successfully", success: true};
  };


  // Change password
  const changePassword = async (data) => {
    let res = await changePasswordAPI(token, data);
    if(res.status !== "success") return {message: res.message, success: false};
    return {message: "Password changed successfully", success: true};
  }





  if(isLoading) return <GlobalLoader />;

  return (
    <AuthContext.Provider value={{user, isAdmin, isLoggedIn, login, logout, token, signup, changePassword, adminLogin}}>
      {props.children}
    </AuthContext.Provider>
  );
};