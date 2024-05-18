import { useState } from "react";

export const useJobs = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);

  const findCategoryById = (categoryId) => {
    return categories.find((category) => category.id === categoryId);
  };

  const handleNavigation = (direction) => {
    let newCategoryId;
    if (direction === "next") {
      newCategoryId =
        currentCategoryId === categories[categories.length - 1]?.id
          ? categories[0]?.id
          : currentCategoryId + 1;
    } else {
      newCategoryId =
        currentCategoryId === categories[0]?.id
          ? categories[categories.length - 1]?.id
          : currentCategoryId - 1;
    }
    setCurrentCategoryId(newCategoryId);
  };

  const currentCategory = findCategoryById(currentCategoryId);

  return {
    categories,
    setCategories,
    currentCategoryId,
    setCurrentCategoryId,
    handleNavigation,
    currentCategory,
  };
};
