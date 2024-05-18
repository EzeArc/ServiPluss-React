// Exportamos el componente HeaderLink como una función de flecha
export const HeaderLink = ({
  checkActive = true,
  href,
  className,
  ...restOfProps
}) => {
  // Obtenemos la ruta actual
  const currentPath = window.location.pathname;
  // Determinamos si el enlace está activo
  const isActive = currentPath === href && checkActive;

  // Definimos las clases CSS para el enlace
  const linkclassNameNames = [
    className,
    "border-b-2 uppercase",
    isActive ? "border-white" : "border-transparent",
  ]
    .filter(Boolean)
    .join(" ");

  // Renderizamos el enlace con las clases y props correspondientes
  return (
    <a href={href} className={linkclassNameNames} {...restOfProps}>
      {restOfProps.children}
    </a>
  );
};
