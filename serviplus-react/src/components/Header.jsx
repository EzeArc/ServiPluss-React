import { ServiLogo, CloseIcon, MenuIcon } from "../icons";
import { Button } from "./Button";
import { HeaderLink } from "./HeaderLink";
import { useContext } from "react";
import { AuthContext } from "../context/useAuthStore";

export const Header = () => {
  const { state, logout } = useContext(AuthContext);

  let firstName = ""; // Variable para almacenar el primer nombre del usuario

  // Verifica si hay un usuario autenticado y si tiene un nombre
  if (state.isAuthenticated && state.name) {
    // Divide el nombre completo del usuario en partes
    const nameParts = state.name.split(" ");
    // Toma el primer elemento de las partes del nombre
    firstName = nameParts[0];
  }

  return (
    <header id="header-nav" className="fixed top-0 w-full px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-16">
        <HeaderLink
          checkActive={false}
          href={"/"}
          className="relative z-10"
          aria-label="volver a inicio"
        >
          <ServiLogo className="absolute w-14 m-auto blur-sm opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </HeaderLink>
        <nav
          id="header-menu"
          className="fixed w-full h-dvh inset-0 bg-[#151a36]/90 text-2xl flex flex-col items-center justify-center gap-8 -translate-y-full transition-transform duration-300 target:translate-y-0 md:static md:h-[initial] md:bg-[initial] md:text-xl md:flex-row md:translate-y-[initial]"
        >
          <HeaderLink className="text__glowing" href={"/servicios/"}>
            Servicios
          </HeaderLink>
          {state.isAuthenticated && state.rol === "ADMIN" && (
            <HeaderLink className="text__glowing" href={"/admin"}>
              Admin
            </HeaderLink>
          )}

          <HeaderLink className="text__glowing" href={"/jobs"}>
            Contratar
          </HeaderLink>
          <HeaderLink className="text__glowing" href={"/usuario/"}>
            Usuario
          </HeaderLink>
          {state.isAuthenticated && (
            <HeaderLink className="text__glowing" href={"/profile/"}>
              Perfil de {firstName}
            </HeaderLink>
          )}
          {state.isAuthenticated === false ? (
            <Button
              className="md:py-2 md:ml-auto md:text-base lg:text-base"
              target="_self"
              url="http://localhost:5173/auth/login"
            >
              Login
            </Button>
          ) : (
            <Button
              className="md:py-2 md:ml-auto md:text-base lg:text-base"
              target="_self"
              url="http://localhost:5173/auth/login"
              onClick={logout}
            >
              Logout
            </Button>
          )}

          <a href="#header-nav" className="md:hidden absolute top-6 right-6">
            <CloseIcon />
          </a>
        </nav>
        <a href="#header-menu" className="md:hidden">
          <MenuIcon />
        </a>
      </div>
    </header>
  );
};
