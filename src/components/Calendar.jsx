import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

const DualMonthCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + months);
    return newDate;
  };

  const addWeeks = (date, weeks) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + weeks * 7);
    return newDate;
  };

  // Get data api
  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      fetch("https://api.example.com/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: selectedRange.start,
          endDate: selectedRange.end,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("API Response:", data))
        .catch((error) => console.error("API Error:", error));
    }
  }, [selectedRange]);

  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const handlePreviousWeek = () => {
    setSelectedRange((prev) => ({
      start: addWeeks(prev.start, -1),
      end: addWeeks(prev.end, -1),
    }));
  };

  const handleNextWeek = () => {
    setSelectedRange((prev) => ({
      start: addWeeks(prev.start, 1),
      end: addWeeks(prev.end, 1),
    }));
  };

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startOffset: firstDay.getDay() };
  };

  const goNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goPrevMonth = () => setCurrentDate(addMonths(currentDate, -1));

  const startOfWeek = (date) => {
    const day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1); // Adjust to get the start of the week (Monday)
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    const day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? 0 : 7); // Adjust to get the end of the week (Sunday)
    return new Date(date.setDate(diff));
  };

  const handleQuickSelect = (range) => {
    let startDate, endDate;
    const today = new Date();

    switch (range) {
      case "This Week":
        startDate = startOfWeek(today);
        endDate = endOfWeek(today);
        break;
      case "Last Week":
        startDate = startOfWeek(addWeeks(today, -1));
        endDate = endOfWeek(addWeeks(today, -1));
        break;
      case "Past 2 Weeks":
        startDate = startOfWeek(addWeeks(today, -2));
        endDate = endOfWeek(today);
        break;
      case "This Month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Last Month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "This Year":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 12, 0);
        break;
      case "Last Year":
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        endDate = new Date(today.getFullYear() - 1, 12, 0);
        break;
      default:
        return;
    }

    setSelectedRange({ start: startDate, end: endDate });
  };

  const renderMonth = (date) => (
    <div className="p-2">
      <div className="text-sm font-medium text-center mb-2">
        {formatMonth(date)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-gray-500 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mt-1">
        {(() => {
          const { daysInMonth, startOffset } = getMonthDays(date);
          const days = [];

          for (let i = 0; i < startOffset; i++) {
            days.push(<div key={`empty-${i}`} className="p-1" />);
          }

          for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              day
            );
            days.push(
              <button
                key={day}
                className={`p-1 rounded hover:bg-blue-50 ${
                  currentDate >= selectedRange.start &&
                  currentDate <= selectedRange.end
                    ? "bg-blue-100"
                    : ""
                } ${
                  currentDate.toDateString() === new Date().toDateString()
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {day}
              </button>
            );
          }
          return days;
        })()}
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Trigger Button */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center justify-between px-3 py-2 border border-gray-300 bg-white shadow hover:bg-gray-50 text-sm cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {formatMonth(selectedRange.start)} →{" "}
              {formatMonth(selectedRange.end)}
            </span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className="bg-white shadow px-3 py-2 border border-gray-300 cursor-pointer"
            onClick={handlePreviousWeek}
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>
          <button
            className="bg-white shadow px-3 py-2 border border-gray-300 cursor-pointer"
            onClick={handleNextWeek}
          >
            <MdOutlineKeyboardArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className="absolute top-14 right-12 border border-gray-300 bg-white shadow-md rounded overflow-hidden z-50">
          <div className="flex w-[600px]">
            {/* Quick Selections Sidebar */}
            <div className="w-36 border-r border-gray-200">
              {[
                "This Week",
                "Last Week",
                "Past 2 Weeks",
                "This Month",
                "Last Month",
                "This Year",
                "Last Year",
              ].map((label) => (
                <button
                  key={label}
                  onClick={() => handleQuickSelect(label)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-200"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Calendar View */}
            <div className="flex-1">
              <div className="flex items-center justify-between px-2 py-1 border-b border-gray-300">
                <button
                  onClick={goPrevMonth}
                  className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                >
                  <MdChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNextMonth}
                  className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                >
                  <MdChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-around">
                {renderMonth(currentDate)}
                {renderMonth(addMonths(currentDate, 1))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualMonthCalendar;
