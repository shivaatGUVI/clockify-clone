import { useContext, useState } from "react";
import { CategoryContext } from "../../context/category/context";
import CategoryForm from "./Form";

const CategoryList = () => {
  const { categories, setEditingCategory, deleteCategory } =
    useContext(CategoryContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (category = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 p-6  overflow-auto">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Category Cards Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition"
            >
              <span className="text-gray-900 font-medium">{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => openModal(category)}
                  className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No categories available.</p>
      )}

      {/* Modal for Adding/Editing Category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <CategoryForm closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
