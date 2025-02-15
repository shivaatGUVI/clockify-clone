import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Reports from "../pages/Reports";
import { AuthContext } from "../contexts/LoginContext";
import Home from "../pages/Home";

const AllRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <div>Dashboard</div> : <Navigate to="/login" />
        }
      />

      <Route
        path="/reports"
        element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
      />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 404 Route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AllRoutes;
