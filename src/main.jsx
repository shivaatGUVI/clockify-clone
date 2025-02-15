import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CategoryProvider from "./context/category/provider.jsx";
import TrackerProvider from "./context/tracker/provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <TrackerProvider>
        <App />
      </TrackerProvider>
    </CategoryProvider>
  </StrictMode>
);
