import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import GlobalLoader from "./components/ui/Loaders/GlobalLoader";

const Homepage = React.lazy(() => import("./pages/Homepage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));




function App() {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
