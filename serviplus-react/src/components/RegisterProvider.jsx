import { useEffect } from "react";
import { categoryData } from "../utils/fetchCategory.js";
import AuthService from "../api/auth.js";
import { useForm } from "../hooks/useForm.js";

const initialForm = {
  name: "",
  mail: "",
  phone: "",
  address: "",
  file: "",
  salary: "",
  password: "",
};

// Funciones de validación para cada campo
const formValidations = {
  name: [
    (value) => ({
      isValid: value.trim() !== "",
      message: "El nombre es requerido",
    }),
  ],
  mail: [
    (value) => ({
      isValid: value.includes("@"),
      message: "El correo debe tener una '@'",
    }),
  ],
  phone: [
    (value) => ({
      isValid: /^\d+$/.test(value),
      message: "El teléfono debe contener solo números",
    }),
  ],
  address: [
    (value) => ({
      isValid: value.trim() !== "",
      message: "La dirección es requerida",
    }),
  ],
  file: [
    (value) => ({
      isValid: value.trim() !== "",
      message: "Por favor selecciona un archivo",
    }),
  ],
  salary: [
    (value) => ({
      isValid: /^\d+$/.test(value),
      message: "El salario debe contener solo números",
    }),
  ],
  password: [
    (value) => ({
      isValid: value.length >= 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  ],
};

export const RegisterProvider = () => {
  const authService = new AuthService();
  const {
    registerEmail,
    registerName,
    registerPhone,
    registerAddress,
    registerSalary,
    registerCategory,
    registerPassword,
    formState,
    isFormValid,
    onInputChange,
  } = useForm(initialForm, formValidations);

  async function fillCategorySelect() {
    const select = document.getElementById("category");
    const categories = await categoryData;
    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      select.appendChild(option);
    }
  }

  // Define la lógica para obtener las categorías
  useEffect(() => {
    fillCategorySelect();
  }, []); // Se ejecutará una vez después del montaje inicial
  // Llena el elemento select con las categorías

  const registerProviderSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) return;
    try {
      const data = {
        mail: document.getElementById("mail")?.value || "",
        name: document.getElementById("name")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        address: document.getElementById("address")?.value || "",
        file: document.getElementById("file").files[0], // Accede al archivo desde el campo de entrada de archivo
        salary: document.getElementById("salary")?.value || "",
        category: document.getElementById("category")?.value || "",
        password: document.getElementById("password")?.value || "",
        // Agrega otros campos según sea necesario
      };

      console.log("Data:", data); // Agrega esta línea para imprimir los valores
      const result = await authService.onRegisterProvider(data);
      console.log("Result:", result); // Agrega esta línea para imprimir los valores

      if (result) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="max-w-sm mx-auto"
      id="registerProviderForm"
      method="POST"
      encType="multipart/form-data"
      action="http://localhost:8080/api/auth/registerProvider"
    >
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
          value={registerEmail}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          value={registerName}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your phone
        </label>
        <input
          name="phone"
          type="tel"
          id="phone"
          value={registerPhone}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="22145647"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your address
        </label>
        <input
          name="address"
          type="text"
          id="address"
          value={registerAddress}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bs As"
        />
      </div>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="image_help"
          id="file"
          type="file"
          name="file"
          onChange={onInputChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="salary"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your salary
        </label>
        <input
          name="salary"
          type="number"
          id="salary"
          value={registerSalary}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="$3000"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your category
        </label>
        <select
          name="category"
          id="category"
          value={registerCategory}
          onChange={onInputChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></select>
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
          value={registerPassword}
          onChange={onInputChange}
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
        value="Registrarse"
        onClick={(event) => {
          registerProviderSubmit(event);
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrarse
      </button>
    </form>
  );
};
