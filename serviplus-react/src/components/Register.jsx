import AuthService from "../api/auth.js";
import { useForm } from "../hooks/useForm.js";
import { Button } from "./Button";

const initialForm = {
  name: "",
  mail: "",
  phone: "",
  address: "",
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

export const Register = () => {
  const authService = new AuthService();
  const {
    registerEmail,
    registerName,
    registerAddress,
    registerPassword,
    registerPhone,
    formState,
    isFormValid,
    onInputChange,
  } = useForm(initialForm, formValidations);

  const registerSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) return;
    try {
      const result = await authService.onRegister(formState);
      console.log(formState);
      //Redirigir al usuario a la página principal
      if (result) {
        window.location.href = "/";
        //login(result);
      }
    } catch (error) {
      //Mostrar un mensaje de error
      console.error(error);
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto" id="register-form" method="POST">
        <div className="my-5">
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
            value={registerEmail}
            onChange={onInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            name="name"
            type="text"
            value={registerName}
            onChange={onInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            name="phone"
            type="tel"
            value={registerPhone}
            onChange={onInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="22145647"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your address
          </label>
          <input
            name="address"
            type="text"
            value={registerAddress}
            onChange={onInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="22145647"
          />
        </div>

        <div className="my-5">
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
            value={registerPassword}
            onChange={onInputChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex items-start my-5">
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
          value="Registrarse"
          onClick={(event) => {
            registerSubmit(event);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrarse
        </button>
        <a
          href="http://localhost:5173/auth/login"
          target="_self"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 no-underline hover:underline"
        >
          {"Already have an account? 👉 Log in here."}
        </a>
        <div className="mt-10">
          <Button
            className="md:py-2 md:ml-auto md:text-base lg:text-base"
            target="_self"
            url="http://localhost:5173/auth/registerProvider"
          >
            Are you a Provider? Register here ➡
          </Button>
        </div>
      </form>
    </>
  );
};
