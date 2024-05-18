import apiRoutes from "../api.js";

// export const getCategories = await fetch(
//   `${apiRoutes.serviPlus}/categories`
// ).then((response) => response.json());

export const categoryData = await fetch(
  `${apiRoutes.serviPlus}/listCategoriesActiveWithImages`
).then((response) => response.json());
