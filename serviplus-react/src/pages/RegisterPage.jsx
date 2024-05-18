import { HeroContainer } from "../components/HeroContainer";
import { Register } from "../components/Register";

export const RegisterPage = () => {
  return (
    <>
      <HeroContainer img={"/contacto.webp"} />
      <section className="max-w-8xl mx-auto py-20 px-20">
        <Register />
      </section>
    </>
  );
};
