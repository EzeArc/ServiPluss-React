import apiRoutes from "../api";

// export const listaProvidersActive = async () => {
//   const response = await fetch(
//     "http://localhost:8080/user/listProvidersActive"
//   );
//   const dataProviders = await response.json();
//   return dataProviders;
// };

export const fetchProvidersWithImages = async () => {
  const dataProviders = await fetch(
    `${apiRoutes.users}/listProvidersActiveWithImages`
  );
  const data = await dataProviders.json();
  return data;
};
