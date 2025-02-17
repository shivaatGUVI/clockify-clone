import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Reports from "../pages/Reports";
import { AuthContext } from "../context/LoginContext";
import Home from "../pages/Home";
import CategoryList from "../components/category/List";
import TrackerForm from "../components/tracker/Form";
import TeamManagement from "../components/Team/TeamManagement";
import Task from "../components/Team/Task";

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
        path="/task"
        element={isAuthenticated ? <Task /> : <Navigate to="/login" />}
        // element={<Task/>}
      />

      <Route path="/reports" element={<Reports />} />

      <Route path="/categories" element={<CategoryList />} />

      <Route path="/tracker" element={<TrackerForm />} />

      <Route
        path="/team"
        // element={isAuthenticated ? <TeamManagement /> : <Navigate to="/login" />}
        element={<TeamManagement />}
      />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 404 Route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AllRoutes;
