import { FormImovel } from "../../../components/dashboard/FormImovel";
import {BASE_URL} from "../../../config";

export const CriarImovel = () => {
  const criarImovel = async (dados) => {
    try {
      const response = await fetch(`${BASE_URL}/imoveis/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, //JWT
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error("Erro ao criar imóvel");

      const result = await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <FormImovel onSubmit={criarImovel}/>
    </div>
  );
};
