import { useState, useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { TrackerContext } from "../../context/tracker/context";

const TrackerForm = () => {
  const { categories } = useContext(CategoryContext);
  const { startTracker } = useContext(TrackerContext);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !title)
      return alert("Please select a category and enter a title!");
    startTracker(category, title);
    setTitle("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="tracker-form">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Category Input */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit">Start Tracking</button>
    </form>
  );
};

export default TrackerForm;
