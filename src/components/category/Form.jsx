import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../context/category/context";

const CategoryForm = () => {
  const { addCategory, updateCategory, editingCategory } =
    useContext(CategoryContext);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(editingCategory ? editingCategory.name : "");
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(name);
    } else {
      addCategory(name);
    }
    setName("");
  };

  return (
    <div className="category-form">
      <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editingCategory ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default CategoryForm;
