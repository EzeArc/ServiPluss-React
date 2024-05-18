import { AddCategory } from "../components/AddCategory";
import { HeroContainer } from "./../components/HeroContainer";

export const AdminDashboardPage = () => {
  return (
    <>
      <HeroContainer img={"/contacto.webp"} />
      <AddCategory />
    </>
  );
};
