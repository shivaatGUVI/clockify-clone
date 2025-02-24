import { BrowserRouter } from "react-router";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "./context/LoginContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1">
          {isAuthenticated && <Navbar />}
          <div className="p-4">
            <AllRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
