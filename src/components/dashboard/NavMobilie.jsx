import { NavLink } from "react-router-dom";

export const NavMobilie = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full
      border-t border-gray-200 bg-white
      flex justify-between items-center h-20 px-6 z-50
      shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
    >
      <NavLink
        to="/dashboard/criar"
        className={({ isActive }) =>
          `flex flex-col items-center hover:text-black ${
            isActive ? "text-blue-500" : "text-gray-600"
          }`
        }
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span>Criar</span>
      </NavLink>

      <NavLink
        to="/dashboard/listar"
        className={({ isActive }) =>
          `flex flex-col items-center hover:text-black ${
            isActive ? "text-blue-500" : "text-gray-600"
          }`
        }
      >
        <span className="material-symbols-outlined">list</span>
        <span>Listar</span>
      </NavLink>

      <NavLink
        to="/dashboard/editar"
        className={({ isActive }) =>
          `flex flex-col items-center hover:text-black ${
            isActive ? "text-blue-500" : "text-gray-600"
          }`
        }
      >
        <span className="material-symbols-outlined">edit_document</span>
        <span>Editar</span>
      </NavLink>

      <NavLink
        to="/dashboard/config"
        className={({ isActive }) =>
          `flex flex-col items-center hover:text-black ${
            isActive ? "text-blue-500" : "text-gray-600"
          }`
        }
      >
        <span className="material-symbols-outlined">clinical_notes</span>
        <span>Config</span>
      </NavLink>
    </nav>
  );
};
