import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // se não houver token, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // timestamp em segundos

    if (decoded.exp && decoded.exp < now) {
      // token expirou
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // token inválido
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};
