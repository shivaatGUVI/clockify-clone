import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/LoginContext.jsx";
import CategoryProvider from "./context/category/provider.jsx";
import TrackerProvider from "./context/tracker/provider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CategoryProvider>
      <TrackerProvider>
        <App />
      </TrackerProvider>
    </CategoryProvider>
  </AuthProvider>
);
