import AuthService from "../api/auth.js";
import { useForm } from "../hooks/useForm";

const initialForm = {
  name: "",
  file: "",
};

// Funciones de validación para cada campo
const formValidations = {
  name: [
    (value) => ({
      isValid: value.trim() !== "",
      message: "El nombre es requerido",
    }),
  ],
  file: [
    (value) => ({
      isValid: value.trim() !== "",
      message: "Por favor selecciona un archivo",
    }),
  ],
};

export const AddCategory = () => {
  const authService = new AuthService();

  const { registerCategoryName, formState, isFormValid, onInputChange } =
    useForm(initialForm, formValidations);

  const registerNewCategory = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      // Obtén los datos del formulario usando el objeto data
      const data = {
        name: document.getElementById("name")?.value || "",
        file: document.getElementById("file").files[0], // Accede al archivo desde el campo de entrada de archivo
      };

      console.log("Data:", data); // Agrega esta línea para imprimir los valores

      // Verifica que los elementos requeridos no estén vacíos
      if (Object.values(data).some((value) => !value)) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      // Envía los datos del formulario
      const response = await authService.onRegisterCategory(data);

      if (response) {
        console.log("Registro exitoso");
      } else {
        console.log("Error en el registro");
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="py-2 text-lg font-semibold text-gray-900 dark:text-white ">
            Registra un nuevo servicio
          </h3>
          <form
            className="max-w-sm mx-auto"
            id="registerCategoryForm"
            method="POST"
            encType="multipart/form-data"
            action="http://localhost:8080/admin/category"
          >
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={registerCategoryName}
                  onChange={onInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={onInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Agregar imagen"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              value="Registrarse"
              onClick={(event) => {
                registerNewCategory(event);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
