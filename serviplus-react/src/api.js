const apiRoutes = {
  admin: "http://localhost:8080/admin",
  serviPlus: "http://localhost:8080/servi-plus",
  users: "http://localhost:8080/user",
  auth: `http://localhost:8080/api/auth/validate?jwt=`,
};

export default apiRoutes;

// import axios from "axios";
// import { getEnvVariables } from "./../helpers/getEnvVariables";

// const { VITE_API_URL } = getEnvVariables();

// const calendarApi = axios.create({
//   baseURL: VITE_API_URL,
// });

// //Configurar interceptores
// calendarApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     "x-token": localStorage.getItem("token"),
//   };

//   return config;
// });

// export default calendarApi;
