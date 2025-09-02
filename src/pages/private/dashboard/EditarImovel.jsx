import { useLocation } from "react-router-dom";
import { Search } from "../../../components/dashboard/Search";

export const EditarImovel = () => {
  const { state } = useLocation();
  const { imovel } = state || {};

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 text-gray-800">
      <p className="p-4 text-4xl text-blue-500">Editar imóvel</p>
      <Search imovel={imovel} />
    </div>
  );
};
