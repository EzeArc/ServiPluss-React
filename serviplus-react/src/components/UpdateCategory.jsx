import AuthService from "../api/services/auth.js";

export const UpdateCategory = () => {


  let id;

  let categoryData = {
    id: id,
    name: "...",
    imagen: null,
  };

  async function getCategories() {
    try {
      const response = await fetch(`http://localhost:8080/admin/categories`);
      if (response.ok) {
        const categories = await response.json();
        const selectElement = document.getElementById("category");
        if (selectElement) {
          categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.text = category.name;
            selectElement.appendChild(option);
          });
        }
      } else {
        console.error(`Error al obtener las categorías`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getCategory(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/category/${id}`
      );
      if (response.ok) {
        categoryData = await response.json();
        const nameInput = document.getElementById("name");
        if (nameInput && "value" in nameInput) {
          nameInput.value = categoryData.name;
        }
      } else {
        console.error(`Error al obtener la categoría`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const form = document.getElementById("updateCategoryForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Categoría actualizada con éxito");
      } else {
        console.error("Error al actualizar la categoría");
      }
    });
  }

  getCategories().then(() => getCategory(id));

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Actualizar Categoría
          </h3>
          <form
            className="max-w-sm mx-auto"
            id="updateCategoryForm"
            method="POST"
            encType="multipart/form-data"
            action={`http://localhost:8080/admin/category/${categoryData.id}`}
          >
            {/*<!-- Resto del formulario -->*/}
            <div className="grid gap-4 mb-4 grid-cols-2">
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
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nombre de la categoría"
                  value={categoryData.name}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  accept="image/*"
                />
              </div>
            </div>
            <button
              type="submit"
              value="Actualizar"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
