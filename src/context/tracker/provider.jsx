import { TrackerContext } from "./context";
import axiosInstance from "../../axios/instance";

// eslint-disable-next-line react/prop-types
const TrackerProvider = ({ children }) => {
  // Start Tracker
  const startTracker = async (category, title) => {
    try {
      const res = await axiosInstance.post("/tracker/start", {
        category,
        title,
      });
      return res.data;
    } catch (err) {
      console.error("Error starting tracker:", err);
      return null;
    }
  };

  // Stop Tracker
  const stopTracker = async (id) => {
    try {
      const res = await axiosInstance.put(`/tracker/stop/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error stopping tracker:", err);
      return null;
    }
  };

  // Resume Tracker
  const resumeTracker = async (id) => {
    try {
      const res = await axiosInstance.post(`/tracker/resume/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error resuming tracker:", err);
      return null;
    }
  };

  return (
    <TrackerContext.Provider
      value={{ startTracker, stopTracker, resumeTracker }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;
