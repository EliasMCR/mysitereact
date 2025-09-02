import { useLocation } from "react-router-dom";
import { Search } from "../../../components/dashboard/Search";

export const EditarImovel = () => {
  const { state } = useLocation();
  const { imovel } = state || {};

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <Search imovel={imovel} />
    </div>
  );
};
