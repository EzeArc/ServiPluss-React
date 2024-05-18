import { BentoItem } from "./BentoItem";

export const Bento = () => {
  return (
    <section
      className={`
    w-full max-w-[1400px]
    grid lg:grid-cols-10 auto-rows-[30rem] gap-4
    mx-auto p-6 md:p-12 lg:p-20
  `}
    >
      <BentoItem
        className="col-span-10 lg:col-span-4"
        title="¿Cuales son nuestros objetivos?"
        image={
          <div
            className="background transition-scale absolute bottom-0 left-0 top-0
      -z-10 h-full w-full bg-blue-950
      bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: "url('/barrio1.webp')" }}
          ></div>
        }
        content={
          <p className="max-w-xl">
            En nuestra búsqueda constante por mejorar y crecer, nos proyectamos
            hacia un futuro emocionante para nuestra app de servicios en Chacras
            de Coria. Nuestros objetivos se alinean con el compromiso de seguir
            siendo un faro de calidad, confianza y comunidad en el mundo de las
            soluciones para el hogar.
          </p>
        }
      />
      <BentoItem
        className="col-span-10 lg:col-span-6"
        title="¿Los profesionales están certificados y son confiables?"
        image={
          <div
            slot="image"
            className="background transition-scale absolute bottom-0 left-0 top-0
      -z-10 h-full w-full bg-blue-800
      bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: "url('/cleaning.webp')" }}
          ></div>
        }
        content={
          <p className="max-w-xl">
            Sí, todos los profesionales que forman parte de nuestra plataforma
            pasan por un proceso de selección riguroso. Verificamos sus
            habilidades, experiencia y antecedentes para asegurar la calidad y
            confiabilidad del servicio
          </p>
        }
      />
      <BentoItem
        className="col-span-10 lg:col-span-6"
        title="¿Cómo funciona la app para encontrar un servicio en Chacras de Coria?"
        image={
          <div
            slot="image"
            className="background transition-scale absolute bottom-0 left-0 top-0
      -z-10 h-full w-full bg-blue-900
      bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: "url('/user-perfil2.webp')" }}
          ></div>
        }
        content={
          <p className="max-w-xl">
            Nuestra app es fácil de usar. Simplemente selecciona el tipo de
            servicio que necesitas, describe tu solicitud y podrás ver una lista
            de profesionales disponibles en Chacras de Coria. Puedes elegir al
            que mejor se adapte a tus necesidades
          </p>
        }
      />
      <BentoItem
        className="col-span-10 lg:col-span-4"
        title="¿Qué sucede si no estoy satisfecho con el servicio?"
        image={
          <div
            slot="image"
            className="background transition-scale absolute bottom-0 left-0 top-0
      -z-10 h-full w-full bg-blue-950
      bg-cover bg-center bg-no-repeat opacity-90 bg-blend-luminosity duration-1000 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: "url('/electricista.webp')" }}
          ></div>
        }
        content={
          <p className="max-w-xl">
            La satisfacción del cliente es nuestra prioridad. Si no estás
            satisfecho con el servicio recibido, contáctanos de inmediato.
            Estamos comprometidos a resolver cualquier problema y garantizar tu
            satisfacción
          </p>
        }
      />
    </section>
  );
};
