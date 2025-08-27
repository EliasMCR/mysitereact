import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // se não houver token, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // aqui você pode opcionalmente validar o token (JWT) expirado
  // ex.: decodificar e checar exp

  return <Outlet />;
};