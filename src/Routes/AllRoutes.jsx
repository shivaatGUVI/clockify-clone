import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Reports from "../pages/Reports";

const AllRoutes = () => {
  // You can add authentication check here
  const isAuthenticated = false; // Replace with your auth logic

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />

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
