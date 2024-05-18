import AuthService from "../api/auth.js";
import { useForm } from "../hooks/useForm.js";
import { AuthContext } from "../context/useAuthStore";
import { useContext } from "react";
import { AuthTokenAndUserData } from "../utils/validateAuthFromUser";

const initialForm = {
  mail: "",
  password: "",
};

// Funciones de validación para cada campo
const formValidations = {
  mail: [(value) => value.includes("@"), 'El correo debe tener una "@"'],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
  ],
};

export const Login = () => {
  const authService = new AuthService();
  const { login } = useContext(AuthContext);

  const {
    loginEmail,
    loginPassword,
    formState,
    isFormValid,
    onInputChange: onLoginInputChange,
  } = useForm(initialForm, formValidations);

  const loginSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      const { mail, password } = formState;
      const result = await authService.onLogin(mail, password);

      //Redirigir al usuario a la página principal
      if (result) {
        const dataUser = await AuthTokenAndUserData();
        login(dataUser);
        return (window.location.href = "/");
      }
    } catch (error) {
      //Mostrar un mensaje de error
      console.error(error);
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto" id="login-form" method="POST">
        <div className="mb-5">
          <label
            htmlFor="mail"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={loginEmail}
            onChange={onLoginInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={loginPassword}
            onChange={onLoginInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          value="Iniciar sesión"
          onClick={(event) => {
            loginSubmit(event);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <a
          href="http://localhost:5173/auth/register"
          target="_self"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {"Don't have an account? 👉 Sign up now."}
        </a>
      </form>
    </>
  );
};
