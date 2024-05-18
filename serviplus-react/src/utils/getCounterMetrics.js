import apiRoutes from "../api";

export async function getMetricsFromFetch() {
  const responseUsers = await fetch(`${apiRoutes.serviPlus}/totalUsers`).then(
    (response) => response.json()
  );

  const responseProviders = await fetch(
    `${apiRoutes.serviPlus}/totalProviders`
  ).then((response) => response.json());

  const responseJobs = await fetch(`${apiRoutes.serviPlus}/totalJobs`).then(
    (response) => response.json()
  );

  return {
    responseUsers,
    responseProviders,
    responseJobs,
  };
}
