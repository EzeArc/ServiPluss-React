import { AddCategory } from "../components/AddCategory";
import { Table } from "../components/Table";
import { HeroContainer } from "./../components/HeroContainer";

export const AdminDashboardPage = () => {
  return (
    <>
      <HeroContainer img={"/contacto.webp"} />
      <section className="flex flex-row justify-between py-20 px-20">
        <AddCategory />
        <Table />
      </section>
    </>
  );
};
