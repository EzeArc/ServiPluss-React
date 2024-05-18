import { useEffect } from "react";
import { HeroContainer } from "../components/HeroContainer";
import { ProviderCard } from "../components/ProviderCard";
import { Arrow } from "../components/Arrow";
import { CategoryTitle } from "../components/CategoryTitle";
import { useJobs } from "../hooks/useJobs";

export const JobsPage = () => {
  const {
    categories,
    setCategories,
    currentCategoryId,
    setCurrentCategoryId,
    handleNavigation,
    currentCategory,
  } = useJobs();

  useEffect(() => {
    async function fetchProviders() {
      const response = await fetch(
        `http://localhost:8080/servi-plus/listCategoriesActiveWithImages`
      );
      const data = await response.json();
      setCategories(data);
      setCurrentCategoryId(data[0]?.id); // Establecer la primera categoría como la categoría actual
    }
    fetchProviders();
  }, []);

  return (
    <>
      <HeroContainer img="/contacto.webp" />

      <section className="max-w-8xl mx-auto mb-20 py-20 px-20">
        <h1 className="relative [font-weight:100] m-auto mb-10 tracking-[1px] font-tomaso text-xl sm:text-3xl max-w-full sm:max-w-xl text-center leading-snug flex justify-center items-center h-80 text-white">
          {currentCategory?.name}
        </h1>
        {/* <CategoryTitle isChanging={isChanging}>{categoryName}</CategoryTitle> */}
        <ProviderCard categoryId={currentCategoryId} />
      </section>
      <footer className="flex flex-col sm:flex-row justify-center px-4 items-center gap-x-20 rounded bg-black/50 backdrop-blur-xl mt-20 py-2">
        <div className="flex justify-center items-center gap-x-4 px-2 rounded py-2">
          <button
            className="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"
            onClick={() => handleNavigation("prev")}
          >
            <Arrow rotated />
          </button>
          <span className="text-lg font-semibold">
            Categoria{" "}
            <span className="text-3xl">
              {currentCategory ? currentCategory.id : ""}/{categories.length}
            </span>
          </span>
          <button
            className="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition"
            onClick={() => handleNavigation("next")}
          >
            <Arrow />
          </button>
        </div>
      </footer>
    </>
  );
};
