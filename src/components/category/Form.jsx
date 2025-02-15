import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../context/category/context";

// eslint-disable-next-line react/prop-types
const CategoryForm = ({ closeModal }) => {
  const { addCategory, updateCategory, editingCategory } =
    useContext(CategoryContext);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(editingCategory ? editingCategory.name : "");
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory._id, { name });
    } else {
      addCategory({ name });
    }
    setName("");
    closeModal();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingCategory ? "Edit Category" : "Add Category"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {editingCategory ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
