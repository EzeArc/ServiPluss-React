import { HeroContainer } from "../components/HeroContainer.jsx";
import { Button } from "../components/Button.jsx";
import { Numbers } from "../components/Numbers.jsx";
import { Galeria } from "../components/Galeria.jsx";

export const ServiciosPage = () => {
  return (
    <>
      <HeroContainer img="/contacto.webp">
        <h1 className="lg:text-6xl text-4xl text-center uppercase mb-20 tracking-widest">
          Encuentra tu servicio
        </h1>
      </HeroContainer>
      <main>
        <Galeria />
        <Numbers />
      </main>
    </>
  );
};
