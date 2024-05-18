import apiRoutes from "../api.js";
import { UserIcon, ProviderIcon, JobIcon } from "../icons";

const dataUsers = await fetch(`${apiRoutes.serviPlus}/totalUsers`).then(
  (response) => response.json()
);
const totalUsers = dataUsers;

const dataProviders = await fetch(`${apiRoutes.serviPlus}/totalProviders`).then(
  (response) => response.json()
);
const totalProviders = dataProviders;

const dataJobs = await fetch(`${apiRoutes.serviPlus}/totalJobs`).then(
  (response) => response.json()
);
const totalJobs = dataJobs;

export const Metrics = () => {
  return (
    <div className="antialiased w-full h-full bg-sky-300/5 text-gray-400 font-inter p-10">
      <div className="container px-4 mx-auto">
        <div>
          <div id="title" className="text-center my-10">
            <h1 className="font-bold text-4xl text-white">Sobre ServiPluss</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-10 pt-10">
            <div
              id="plan"
              className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
            >
              <div
                id="title"
                className="flex flex-col items-center w-full py-5 border-b border-gray-800"
              >
                <UserIcon className="mx-auto fill-stroke text-indigo-600" />
                <h2 className="font-bold text-3xl text-white">Usuarios</h2>
                <h3 className="font-extrabold text-indigo-500 text-4xl mt-2">
                  {totalUsers}
                </h3>
              </div>
              <div id="content" className="">
                <div id="icon" className="my-5">
                  <p className="text-gray-500 text-sm pt-2">
                    Cantidad de usuarios registrados
                  </p>
                </div>
              </div>
            </div>
            <div
              id="plan"
              className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
            >
              <div
                id="title"
                className="flex flex-col items-center w-full py-5 border-b border-gray-800"
              >
                <ProviderIcon className="mx-auto fill-stroke text-indigo-600" />
                <h2 className="font-bold text-3xl text-white">Provedores</h2>
                <h3 className="font-extrabold text-indigo-500 text-4xl mt-2">
                  {totalProviders}
                </h3>
              </div>
              <div id="content" className="">
                <div id="icon" className="my-5">
                  <p className="text-gray-500 text-sm pt-2">
                    Cantidad de provedores activos
                  </p>
                </div>
              </div>
            </div>
            <div
              id="plan"
              className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
            >
              <div
                id="title"
                className="flex flex-col items-center w-full py-5 border-b border-gray-800"
              >
                <JobIcon className="mx-auto fill-stroke text-indigo-600" />
                <h2 className="font-bold text-3xl text-white">Trabajos</h2>
                <h3 className="font-extrabold text-indigo-500 text-4xl mt-2">
                  {totalJobs}
                </h3>
              </div>
              <div id="content" className="">
                <div id="icon" className="my-5">
                  <p className="text-gray-500 text-sm pt-2">
                    Trabajos realizados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
