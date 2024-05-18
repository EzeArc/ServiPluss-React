import { createContext, useReducer } from "react";
import { authReducer, authInitialState } from "../reducers/authReducer";
import { AuthTokenAndUserData } from "../utils/validateAuthFromUser";

export const AuthContext = createContext();

function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const login = (userData) =>
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        mail: userData.mail,
        name: userData.name,
        jwt: userData.jwt,
        rol: userData.rol,
        isAuthenticated: true,
      },
    });

  const logout = () => dispatch({ type: "LOGOUT" });

  const checking = async () => {
    dispatch({ type: "CHECKING_CREDENTIALS" });
    try {
      const userData = await AuthTokenAndUserData();
      login(userData); // Actualiza el estado con los datos del usuario obtenidos
    } catch (error) {
      console.error("Error al verificar credenciales:", error);
      logout(); // Si hay un error, cierra la sesión
    }
  };

  return { state, login, logout, checking };
}

export function AuthProvider({ children }) {
  const { state, login, logout, checking } = useAuthReducer();

  return (
    <AuthContext.Provider value={{ state, login, logout, checking }}>
      {children}
    </AuthContext.Provider>
  );
}
