import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../context/category/context";
import { TrackerContext } from "../../context/tracker/context";
import { FaPlay, FaClock } from "react-icons/fa";
import { IoStopOutline, IoTimerOutline } from "react-icons/io5";

const TrackerForm = () => {
  const { categories } = useContext(CategoryContext);
  const { startTracker, stopTracker, addManualTask } =
    useContext(TrackerContext);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [time, setTime] = useState(0);
  const [taskId, setTaskId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedTime = formatTimeInput(now.getHours(), now.getMinutes());
    setStartTime(formattedTime);
    setEndTime(formattedTime);
    setDate(now.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatTimeInput = (hours, minutes) => {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleStartStop = async () => {
    if (!isTracking) {
      if (!title || !category)
        return alert("Please enter a task and select a category!");
      const start = new Date().toISOString();
      try {
        const startedTaskId = await startTracker(category, title, start);
        setTaskId(startedTaskId);
        setIsTracking(true);
      } catch (error) {
        console.error("Error starting tracker:", error);
      }
    } else {
      if (taskId) {
        const stop = new Date().toISOString();
        try {
          await stopTracker(taskId, stop);
        } catch (error) {
          console.error("Error stopping tracker:", error);
        }
      }
      setIsTracking(false);
      setTime(0);
      setTitle("");
      setCategory("");
      setTaskId(null);
    }
  };

  const handleManualAdd = async () => {
    if (!title || !category || !startTime || !endTime || !date)
      return alert("Please enter all fields!");
    const startDateTime = convertTimeToDate(date, startTime);
    const endDateTime = convertTimeToDate(date, endTime);
    try {
      await addManualTask(category, title, startDateTime, endDateTime);
      setTitle("");
      setCategory("");
      setStartTime(
        formatTimeInput(new Date().getHours(), new Date().getMinutes())
      );
      setEndTime(
        formatTimeInput(new Date().getHours(), new Date().getMinutes())
      );
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error adding manual task:", error);
    }
  };

  const convertTimeToDate = (dateString, timeString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  return (
    <div className="flex items-center gap-4 rounded-xl px-6 py-4 w-full max-w-4xl mx-auto">
      <button
        onClick={() => setIsManual(!isManual)}
        className="text-gray-700 hover:text-green-600 text-2xl"
      >
        {isManual ? <IoTimerOutline /> : <FaClock />}
      </button>

      <input
        type="text"
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-lg text-md"
      />

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-52 p-3 border border-gray-300 rounded-lg text-md text-green-600 hover:bg-gray-100"
        >
          {category
            ? categories.find((cat) => cat._id === category)?.name
            : "+ Category"}
        </button>

        {showDropdown && (
          <div className="absolute left-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-md z-10">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setCategory(cat._id);
                  setShowDropdown(false);
                }}
                className="w-full p-2 text-left hover:bg-gray-100"
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {isManual ? (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-36 p-2 rounded-lg text-md border border-gray-300"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-24 p-2 rounded-lg text-md border border-gray-300"
          />
          <span className="text-gray-600 text-lg">–</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-24 p-2 rounded-lg text-md border border-gray-300"
          />
          <button
            onClick={handleManualAdd}
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg text-md"
          >
            +
          </button>
        </div>
      ) : (
        <>
          <div className="text-2xl font-semibold text-gray-900 w-24 text-center">
            {formatTime(time)}
          </div>
          <button onClick={handleStartStop} className="px-6 py-3 border border-gray-300 rounded-lg text-lg text-green-600 hover:bg-green-100">
            {isTracking ? <IoStopOutline /> : <FaPlay />}
          </button>
        </>
      )}
    </div>
  );
};

export default TrackerForm;
