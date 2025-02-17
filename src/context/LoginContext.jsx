import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/check-session`
      );
      setIsAuthenticated(response.data.authenticated);
      console.log("check");
      console.log("response.data", response);

      // setUser(response.data.user);
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        checkSession,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
