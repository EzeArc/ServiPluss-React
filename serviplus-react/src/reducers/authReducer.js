export const authInitialState = {
  isAuthenticated: false,
  name: "",
  mail: "",
  jwt: "",
  rol: "",
  loading: false, // Nuevo estado para la carga
};

export const AUTH_ACTION_TYPES = {
  LOGIN: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  CHECKING: "CHECKING_CREDENTIALS",
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload.name,
        mail: action.payload.mail,
        jwt: action.payload.jwt,
        rol: action.payload.rol,
      };
    case AUTH_ACTION_TYPES.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        name: "",
        mail: "",
        jwt: "",
        rol: "",
      };
    case AUTH_ACTION_TYPES.CHECKING:
      return {
        ...state,
        loading: true, // Establecer estado de carga
      };
    default:
      return state;
  }
};
