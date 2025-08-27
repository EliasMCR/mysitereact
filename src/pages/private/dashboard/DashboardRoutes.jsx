import { Routes, Route } from "react-router-dom";
import Dashboard from "./DashboardLayout";
import Pesquisa from "./Pesquisa";
import CriarImovel from "./CriarImovel";
import ConfigImobiliaria from "./ConfigImobiliaria";
import { ListarImovel } from "./ListarImovel";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Pesquisa />} />           
        <Route path="criar" element={<CriarImovel />} /> 
        <Route path="listar" element={<ListarImovel />} /> 
        <Route path="editar/:id" element={<EditarImovel />} /> {/* /dashboard/modificar/123 */}
        <Route path="config" element={<ConfigImobiliaria />} /> 
      </Route>
    </Routes>
  );
}