import { useLocation } from "react-router-dom";
import { Search } from "../../../components/dashboard/Search";
import { BASE_URL } from "../../../config";
import { useSalvarImagens } from "../../../components/hooks/dashboard/useSalvarImagens";

export const EditarImovel = () => {
  const { state } = useLocation();
  const { imovel } = state || {};
  const {
    loading: loadingImagens,
    error,
    salvarImagens,
    clearError,
  } = useSalvarImagens();

  const handleUpdate = async (payload) => {
    try {
      const token = localStorage.getItem("token");

      // Pega os arquivos novos e remove do payload
      const arquivosNovos = payload.newFiles || [];
      delete payload.newFiles;

      // Salva as imagens e retorna lista de URLs
      const imagensNovasImovel = await salvarImagens(arquivosNovos);

      // Monta o payload final sem campos extras
      const payloadFinal = {
        ...payload,
        imagensNovasImovel: imagensNovasImovel, // nome que o backend espera
        listImagensRemovidas: payload.removedImages || [],
      };

      delete payloadFinal.removedImages; // remove campo desnecessário

      const res = await fetch(`${BASE_URL}/imoveis/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadFinal),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          (data && (data.message || data.error)) ||
            text ||
            "Erro ao atualizar imóvel"
        );
      }

      alert("Imóvel atualizado com sucesso!");
      window.location.href = "/dashboard/listar"; // redireciona para lista de imóveis
    } catch (err) {
      console.error(err);
      alert(`Erro ao atualizar imóvel: ${err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 text-gray-800">
      <p className="p-4 text-4xl text-blue-500">Editar imóvel</p>
      <Search imovel={imovel} onSubmit={handleUpdate} />
    </div>
  );
};
