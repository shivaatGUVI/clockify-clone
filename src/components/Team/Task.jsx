import React, { useState } from "react";
const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Assessment Test", category: "Assessment Test", startTime: "11:01", endTime: "11:01", duration: "00:00:01" },
    { id: 2, title: "Capstone Evaluation", category: "Capstone Evaluation", startTime: "10:58", endTime: "10:58", duration: "00:00:02" },
    { id: 3, title: "Assessment Test", category: "Assessment Test", startTime: "10:52", endTime: "11:00", duration: "00:08:04" },
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const categories = ["Assessment Test", "Capstone Evaluation", "Project Work", "Meeting"];

  const calculateDuration = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const diff = (endTime - startTime) / 1000;
    if (diff < 0) return "--";
    const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const seconds = String(diff % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const addTask = () => {
    if (newTask.trim() !== "" && category.trim() !== "" && startTime.trim() !== "" && endTime.trim() !== "") {
      const duration = calculateDuration(startTime, endTime);
      setTasks([...tasks, { id: Date.now(), title: newTask, category, startTime, endTime, duration }]);
      setNewTask("");
      setCategory("");
      setStartTime("");
      setEndTime("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center w-full">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full">
        <div className="flex gap-2 w-full items-center mb-4">
          <input type="text" placeholder="Task Name" className="border p-2 rounded-md flex-1" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <select className="border p-2 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input type="time" className="border p-2 rounded-md" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <input type="time" className="border p-2 rounded-md" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addTask}>Add Task</button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">This Week</h2>
          <div className="bg-gray-200 p-3 rounded-md">
            {tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center bg-white p-3 mb-2 rounded-md shadow w-full">
                <p className="font-semibold w-1/4">{task.title}</p>
                <p className="text-gray-500 text-sm w-1/4">{task.category}</p>
                <p className="text-gray-600 text-sm w-1/4">{task.startTime} - {task.endTime}</p>
                <p className="font-bold w-1/6">{task.duration}</p>
                <button className="text-red-500 w-1/12" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
