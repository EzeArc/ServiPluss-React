export const getImageDimensions = async (base64Content, imageType) => {
  const img = new Image();
  const imageDataURI = `data:${imageType};base64,${base64Content}`;
  img.src = imageDataURI;

  await img.decode(); // Espera a que la imagen se cargue completamente

  const width = img.naturalWidth;
  const height = img.naturalHeight;

  return { width, height };
};
