import { useState, useEffect } from "react";
import axiosInstance from "../../axios/instance";
import { TrackerContext } from "./context";

// eslint-disable-next-line react/prop-types
const TrackerProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(
    !!localStorage.getItem("taskId")
  );
  const [taskId, setTaskId] = useState(localStorage.getItem("taskId") || null);
  const [time, setTime] = useState(Number(localStorage.getItem("time")) || 0);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTime((prev) => {
          const updatedTime = prev + 1;
          localStorage.setItem("time", updatedTime);
          return updatedTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  // Start Tracker
  const startTracker = async (category, title) => {
    try {
      const res = await axiosInstance.post("/tracker/start", {
        category,
        title,
      });
      const newTaskId = res.data._id;
      setTaskId(newTaskId);
      setIsTracking(true);
      setTime(0);

      localStorage.setItem("taskId", newTaskId);
      localStorage.setItem("time", "0");

      return newTaskId;
    } catch (err) {
      console.error("Error starting tracker:", err);
      return null;
    }
  };

  // Stop Tracker
  const stopTracker = async () => {
    if (!taskId) return;
    try {
      await axiosInstance.put(`/tracker/stop/${taskId}`);
      setIsTracking(false);
      setTaskId(null);
      setTime(0);

      localStorage.removeItem("taskId");
      localStorage.removeItem("time");
    } catch (err) {
      console.error("Error stopping tracker:", err);
    }
  };

  // Resume Tracker
  const resumeTracker = async (id) => {
    try {
      const res = await axiosInstance.post(`/tracker/resume/${id}`);
      const resumedTaskId = res.data.taskId;
      setTaskId(resumedTaskId);
      setIsTracking(true);

      localStorage.setItem("taskId", resumedTaskId);

      return resumedTaskId;
    } catch (err) {
      console.error("Error resuming tracker:", err);
      return null;
    }
  };

  return (
    <TrackerContext.Provider
      value={{ isTracking, time, startTracker, stopTracker, resumeTracker }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export default TrackerProvider;
