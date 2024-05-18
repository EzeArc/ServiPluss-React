import { ServiLogo } from "../icons";

export const Intro = () => {
  return (
    <section className="flex flex-col items-center text-xl text-left px-20 max-w-[60ch] text-pretty mx-auto my-24">
      <ServiLogo className="w-24 m-auto mb-10" alt="Logo de ServiPluss" />
      <h1 className="text-5xl font-semibold text-center text-wrap mx-auto mt-4 mb-10 tracking-wide">
        Bienvenidos/as
        <br />a ServiPluss
      </h1>
      <p>
        Conectando a la Comunidad de Chacras de Coria con Profesionales Locales
      </p>
      <p>
        ServiPluss es una aplicación web innovadora diseñada para
        <strong>facilitar la búsqueda y contratación</strong> de servicios
        locales en Chacras de Coria, Mendoza. Con el objetivo de crear un puente
        efectivo entre los residentes y los proveedores de servicios.
      </p>
      <p>
        ServiPluss se ha convertido en la plataforma preferida para
        <strong>satisfacer una amplia gama de necesidades</strong>.
      </p>
    </section>
  );
};
