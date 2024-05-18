import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/useAuthStore";
import {
  HomePage,
  JobsPage,
  LoginPage,
  RegisterPage,
  RegisterProviderPage,
  ServiciosPage,
  AdminDashboardPage,
  UserProfilePage,
} from "../pages";

export const AppRouter = () => {
  const { state, checking } = useContext(AuthContext);
  useEffect(() => {
    checking();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/registerProvider" element={<RegisterProviderPage />} />
      <Route path="/servicios" element={<ServiciosPage />} />

      {state.isAuthenticated && state.rol !== "ADMIN" ? (
        <>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route path="/admin" element={<AdminDashboardPage />} />
      )}
    </Routes>
  );
};
