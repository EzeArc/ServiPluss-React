import { useState, useEffect, useRef } from "react";
import { getImageDimensions } from "../utils/getImageDimensions";
import apiRoutes from "../api";

export const useGallery = () => {
  const offset = 10;
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dataProviders, setDataProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const first = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProvidersResponse = await fetch(
          `${apiRoutes.users}/listProvidersActiveWithImages`
        );
        const data = await dataProvidersResponse.json();
        console.log(data);
        setDataProviders(data);

        // Cargar automáticamente los primeros proveedores
        const startIndex = currentPage * offset;
        const endIndex = startIndex + offset;
        const initialProviders = data.slice(startIndex, endIndex);
        const initialPhotosData = await Promise.all(
          initialProviders.map(async (provider) => {
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
          })
        );

        setPhotos(initialPhotosData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    //Ejecuta el efecto para montar la galería, y va cambiando en base a la dependencia
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
      const moreProviders = await listaProvidersActive();
      const nextProviders = moreProviders.slice(
        currentPage * offset,
        (currentPage + 1) * offset
      );

      const newPhotosData = await Promise.all(
        nextProviders.map(async (provider) => {
          const dimensions = await getImageDimensions(
            provider.image.content,
            provider.image.mime
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
        })
      );

      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosData]);
      setCurrentPage((prevPage) => prevPage + 1);
      setIsExpanded(true);
    } catch (error) {
      console.error("Error al cargar más proveedores:", error);
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
