import { BrowserRouter } from "react-router";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "./contexts/LoginContext";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="flex">
      <Sidebar />
        <div className="flex-1">
        <Navbar />
          <div className="p-4">
            <AllRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
