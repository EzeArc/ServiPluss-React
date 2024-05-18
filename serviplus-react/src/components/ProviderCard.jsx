import apiRoutes from "../api";
import "./styles/ProviderCard.css";

const dataProviders = await fetch(
  `${apiRoutes.users}/listProvidersActiveWithImages`
).then((response) => response.json());

const listProviders = dataProviders;
console.log(listProviders);

export const ProviderCard = ({ categoryId }) => {
  const filteredProviders = listProviders.filter(
    (provider) => provider.category.id === categoryId
  );

  return (
    <>
      {filteredProviders.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 px-8 lg:px-24 xl:px-0 min-h-[343px]">
          {filteredProviders.map((provider) => (
            <li
              key={provider.id}
              className="flex flex-col text-center items-center w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-slate-800 dark:border-gray-700 relative rounded-lg animate-fade-up"
            >
              <div className="card overflow-hidden flex flex-col items-center py-2 my-2">
                <h2 className="mb-2 text-1xl font-bold tracking-tight dark:text-white uppercase text-balance">
                  {provider.name}
                </h2>
                <img
                  className="card overflow-hidden object-cover group-hover:mix-blend-normal transition-all rounded w-full h-60"
                  src={`data:${provider.mime};base64,${provider.content}`}
                  alt={provider.nameImage}
                  title={provider.name}
                />
              </div>
              <div className="mt-2 px-2 flex-col items-center">
                <h4 className="text-2xl my-2 font-bold text-gray-900 dark:text-white">
                  <strong>{provider.category.name}</strong>
                </h4>
                <p className="text-3xl my-2 font-bold text-gray-900 dark:text-white">
                  <strong>${provider.salary}</strong>
                </p>
              </div>
              <button
                className="my-2 rounded border border-white hover:border-transparent hover:bg-slate-200 hover:text-sky-950 p-4 transition"
                // onClick={""}
              >
                Contratar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-extralight tracking-[1px] font-tomaso text-3xl flex justify-center items-center h-60">
          Actualmente no hay proveedores disponibles para esta categoría.
        </p>
      )}
    </>
  );
};

//rounded-t-lg object-cover
//"w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 relative rounded-lg animate-fade-up"
