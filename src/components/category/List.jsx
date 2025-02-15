import { useContext } from "react";
import { CategoryContext } from "../../context/category/context";

const CategoryList = () => {
  const { categories, setEditingCategory, deleteCategory } =
    useContext(CategoryContext);

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => setEditingCategory(category)}>Edit</button>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
