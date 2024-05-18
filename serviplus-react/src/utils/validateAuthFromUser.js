import apiRoutes from "../api";

export const AuthTokenAndUserData = async () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null; // Si no hay token, devuelve null

  try {
    const response = await fetch(apiRoutes.auth + token);
    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();

    // Aquí deberías verificar el token (decodificar y validar)
    // y extraer los datos del usuario correctamente
    const dataUser = {
      mail: data.mail,
      name: data.name,
      jwt: data.token,
      rol: data.rol,
    };
    //console.log(dataUser);
    return dataUser;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
