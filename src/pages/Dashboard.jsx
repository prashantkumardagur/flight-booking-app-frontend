import React, { useContext, useState, useEffect, Suspense } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

import GlobalLoader from "../components/ui/Loaders/GlobalLoader";
import SideNav from "../components/dashboard/SideNav";

import AuthContext from "../store/AuthContext";

import "./css/dashboard.css";


const Statistics = React.lazy(() => import("../components/dashboard/Statistics"));
const Flights = React.lazy(() => import("../components/dashboard/Flights"));
const Airports = React.lazy(() => import("../components/dashboard/Airports"));




const Dashboard = (props) => {

  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    if(isAdmin) setIsLoading(false);
    else navigate("/auth/admin");
  }, [isAdmin, navigate]);




  if(isLoading) return <GlobalLoader />;

  return (
  <div className="dashboard d-grid">
    <SideNav />
    <main>
      <Suspense fallback={<GlobalLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/statistics" />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/airports" element={<Airports />} />
      </Routes>
      </Suspense>
    </main>
  </div>);
}

export default Dashboard;