import { useContext, useEffect } from "react";
import { AuthContext } from "../context/LoginContext";

export default function Home() {
  const { checkSession, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    checkSession();
  });
  return (
    <>
      <h1>Home page</h1>
      {isAuthenticated ? "yess" : "noo"}
    </>
  );
}
