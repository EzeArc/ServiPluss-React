import { HeroContainer } from "../components/HeroContainer";
import { Login } from "../components/Login";

export const LoginPage = () => {
  return (
    <>
      <HeroContainer img={"/contacto.webp"} />
      <section className="max-w-8xl mx-auto py-20 px-20">
        <Login />
      </section>
    </>
  );
};
