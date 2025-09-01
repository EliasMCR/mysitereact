import { HeaderDash } from "../../../components/dashboard/HeaderDash";
import { NavMobilie } from "../../../components/dashboard/NavMobilie";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeaderDash />
      {/* Aqui é onde as rotas filhas serão renderizadas */}
      <main className="flex-1 mt-24 mb-24 ">
        <Outlet />
      </main>

      <NavMobilie />
    </div>
  );
};
