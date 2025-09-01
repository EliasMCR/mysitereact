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
      className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-700 flex gap-2 cursor-pointer"
    >
      <div>Sair</div>
      <span class="material-symbols-outlined block">exit_to_app</span>
    </button>
  );
};
