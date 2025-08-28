import { useParams,useLocation } from "react-router-dom"
import { FormImovel } from "../../../components/dashboard/FormImovel";

export const EditarImovel = () => {
  const { id } = useParams(); // pega o id da rota
  const {state} = useLocation();
  const { imovel } = state || {};

  if(imovel){

  }

  return (
    <div className="min-h-screen bg-white">
      <FormImovel imovel={imovel} />
    </div>
  )
}
