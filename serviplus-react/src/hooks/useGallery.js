import { useState, useEffect, useRef } from "react";
import { getImageDimensions } from "../utils/getImageDimensions";
import apiRoutes from "../api";

export const useGallery = () => {
  const offset = 10; // Número de imágenes a cargar inicialmente y por lote
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dataProviders, setDataProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const first = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Comienza la carga

        const dataProvidersResponse = await fetch(
          `${apiRoutes.users}/listProvidersActiveWithImages`
        );
        const data = await dataProvidersResponse.json();
        setDataProviders(data);

        // Cargar proveedores iniciales
        const startIndex = 0;
        const endIndex = offset;
        const initialProviders = data.slice(startIndex, endIndex);
        const initialPhotosData = await Promise.all(
          initialProviders.map(async (provider) => {
            try {
              const dimensions = await getImageDimensions(
                provider.content,
                provider.mime
              );
              return {
                id: provider.id,
                name: provider.name,
                nameImage: provider.nameImage,
                mime: provider.mime,
                width: dimensions.width,
                height: dimensions.height,
                content: provider.content,
              };
            } catch (error) {
              console.error(
                `Error decodificando la imagen del proveedor ${provider.id}:`,
                error
              );
              return null; // Retornar null si hay un error
            }
          })
        );

        setPhotos(initialPhotosData.filter((photo) => photo !== null)); // Filtrar imágenes nulas
        setCurrentPage(1); // Establecer a 1 para indicar que se ha cargado la primera página
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false); // Detener la carga
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const init = async () => {
      await import("@appnest/masonry-layout");
      const module = await import("photoswipe/lightbox");
      const PhotoSwipeLightbox = module.default;
      const lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    };
    init();
  }, [photos]);

  const LoadMore = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Comienza la carga

      const startIndex = currentPage * offset;
      const endIndex = startIndex + offset;
      const moreProviders = dataProviders.slice(startIndex, endIndex);

      const newPhotosData = await Promise.all(
        moreProviders.map(async (provider) => {
          try {
            const dimensions = await getImageDimensions(
              provider.content,
              provider.mime
            );
            return {
              id: provider.id,
              name: provider.name,
              nameImage: provider.nameImage,
              mime: provider.mime,
              width: dimensions.width,
              height: dimensions.height,
              content: provider.content,
            };
          } catch (error) {
            console.error(
              `Error decodificando la imagen del proveedor ${provider.id}:`,
              error
            );
            return null; // Retornar null si hay un error
          }
        })
      );

      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...newPhotosData.filter((photo) => photo !== null),
      ]);
      setCurrentPage((prevPage) => prevPage + 1);
      setIsExpanded(true);
    } catch (error) {
      console.error("Error al cargar más proveedores:", error);
    } finally {
      setLoading(false); // Detener la carga
    }
  };

  return {
    loading,
    photos,
    first,
    isExpanded,
    LoadMore,
  };
};
