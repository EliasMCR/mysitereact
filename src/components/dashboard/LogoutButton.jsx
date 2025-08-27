import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token e id da imobiliária do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("idImobiliaria");

    // Redireciona para login
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Sair
    </button>
  );
};
