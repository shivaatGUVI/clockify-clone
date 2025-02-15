import { useState, useEffect } from "react";
import { CategoryContext } from "./context";
import axiosInstance from "../../axios/instance";

// eslint-disable-next-line react/prop-types
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Add category
  const addCategory = async (name) => {
    try {
      const res = await axiosInstance.post("/categories", { name });
      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Update category
  const updateCategory = async (name) => {
    if (!editingCategory) return;
    try {
      await axiosInstance.put(`/categories/${editingCategory._id}`, { name });
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === editingCategory._id ? { ...cat, name } : cat
        )
      );
      setEditingCategory(null);
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        editingCategory,
        setEditingCategory,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
