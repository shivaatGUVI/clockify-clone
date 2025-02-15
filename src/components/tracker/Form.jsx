import { useState, useContext, useEffect } from "react";
import {
  formatTime,
  formatTimeInput,
  convertTimeToDate,
} from "../../utils/time";
import { CategoryContext } from "../../context/category/context";
import { TrackerContext } from "../../context/tracker/context";
import { FaPlay, FaClock, FaTags } from "react-icons/fa";
import { IoStopOutline, IoTimerOutline } from "react-icons/io5";
import { LuAlarmClockPlus } from "react-icons/lu";

const TrackerForm = () => {
  const { categories } = useContext(CategoryContext);
  const { isTracking, time, startTracker, stopTracker, addManualTask } =
    useContext(TrackerContext);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedTime = formatTimeInput(now.getHours(), now.getMinutes());
    setStartTime(formattedTime);
    setEndTime(formattedTime);
    setDate(now.toISOString().split("T")[0]);
  }, []);

  const handleStartStop = async () => {
    if (!isTracking) {
      if (!title || !category) return alert("Please enter task & category!");

      try {
        const startedTaskId = await startTracker(category, title);
        setTaskId(startedTaskId);
      } catch (error) {
        console.error("Error starting tracker:", error);
      }
    } else {
      if (taskId) {
        try {
          await stopTracker(taskId);
        } catch (error) {
          console.error("Error stopping tracker:", error);
        }
      }
      setTaskId(null);
      setTitle("");
      setCategory("");
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

  return (
    <div className="flex flex-wrap items-center justify-between border border-gray-300 gap-3 rounded-xl px-6 md:px-8 py-1 w-full overflow-visible transition-all duration-300">
      {/* Toggle Timer / Manual */}
      <div className="relative group">
        <button
          onClick={() => setIsManual(!isManual)}
          className="text-gray-700 hover:text-green-600 text-2xl transition-all duration-300"
        >
          {isManual ? <IoTimerOutline /> : <FaClock />}
        </button>

        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {isManual ? "Switch to Timer" : "Switch to Manual"}
        </span>
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder="What are you working on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 min-w-[130px] p-3 rounded-lg text-md outline-none bg-transparent duration-300 border border-transparent
        hover:border  hover:border-gray-200 "
      />

      {/* Category Dropdown */}
      <div className="relative min-w-[160px]">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full p-3 rounded-lg text-md text-green-600 hover:cursor-pointer hover:underline transition-all duration-300"
        >
          {category
            ? categories.find((cat) => cat._id === category)?.name
            : "+ Category"}
        </button>

        {showDropdown && (
          <div className="absolute left-0 mt-2 min-w-[200px] w-auto bg-white border border-gray-300 rounded-lg shadow-md z-50 transition-all duration-300 origin-top">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setCategory(cat._id);
                  setShowDropdown(false);
                }}
                className="w-full p-3 text-left hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <FaTags className="text-gray-500" />
                  {cat.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Manual Entry or Timer */}
      {isManual ? (
        <div className="flex items-center flex-wrap gap-3">
          {/* Date & Time Inputs */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40 p-3 rounded-lg text-md outline-none bg-transparent transition-all duration-300 border border-transparent
            hover:border hover:border-gray-400 focus:border-green-500"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-32 p-3 rounded-lg text-md outline-none bg-transparent transition-all duration-300 border border-transparent
            hover:border hover:border-gray-400 focus:border-green-500"
          />
          <span className="text-gray-600 text-lg">–</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-32 p-3 rounded-lg text-md outline-none bg-transparent transition-all  duration-300 
            border border-transparent hover:border hover:border-gray-400 focus:border-green-500"
          />

          {/* ADD Button */}
          <button
            onClick={handleManualAdd}
            className="px-8 py-3 border border-transparent rounded-lg text-lg text-green-600 hover:bg-green-100 transition-all duration-300 "
          >
            <LuAlarmClockPlus className="text-green-600 text-2xl hover:scale-110" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div className="text-2xl font-semibold text-gray-900 w-24 text-center transition-all duration-300">
            {formatTime(time)}
          </div>

          {/* Start / Stop Timer Button */}
          <button
            onClick={handleStartStop}
            className="px-8 py-3 border border-transparent rounded-lg text-lg text-green-600 hover:bg-green-100 transition-all duration-300 "
          >
            {isTracking ? <IoStopOutline /> : <FaPlay />}
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackerForm;
