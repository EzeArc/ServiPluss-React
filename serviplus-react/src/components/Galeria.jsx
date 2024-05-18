import "photoswipe/style.css";
import { Button } from "./Button";
import { useGallery } from "../hooks/useGallery";
import "./styles/Galeria.css";

export const Galeria = () => {
  const { loading, first, isExpanded, photos, LoadMore } = useGallery();

  return (
    <section className="max-w-8xl mx-auto py-20 px-20">
      <h2 className="mx-auto mb-8 text-center text-3xl lg:text-6xl font-semibold tracking-wide">
        Nuestros proveedores
      </h2>
      <p className="text-center text-2xl">Encuentra a tu proveedor ideal</p>
      {loading ? (
        <div className="my-8 py-2 text-center text-2xl">Cargando...</div>
      ) : (
        <masonry-layout
          gap="24"
          maxcolwidth="600"
          className="lg:mx-auto mx-4 py-20"
          id="gallery"
        >
          {photos.map(
            ({ id, nameImage, content, mime, width, height, name }) => (
              <a
                key={id} // Usar el id como clave única
                className="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
                href={`/assets/${nameImage}`}
                target="_self"
                data-cropped="true"
                data-pswp-width={width}
                data-pswp-height={height}
                ref={!first.current ? first : undefined}
              >
                <img
                  className="rounded-xl object-cover w-full h-auto"
                  loading="lazy"
                  src={`data:${mime};base64,${content}`}
                  alt={`Fotografía de ${name}`}
                />
                <img
                  className="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-150 -z-10 object-cover"
                  loading="lazy"
                  src={`data:${mime};base64,${content}`}
                  alt={`Imagen con efecto blur para hacer de sombra de ${name}`}
                />
              </a>
            )
          )}
        </masonry-layout>
      )}

      <div className="text-center mx-auto">
        {!isExpanded && (
          <Button
            className="animate-fade-up uppercase"
            onClick={LoadMore}
            id="load-more"
            url="#"
          >
            Descubre más
          </Button>
        )}
      </div>
    </section>
  );
};
