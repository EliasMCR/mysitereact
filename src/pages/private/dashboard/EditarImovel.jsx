import { useParams, useLocation } from "react-router-dom";
import { Search } from "../../../components/dashboard/Search";
import { BASE_URL } from "../../../config"; // URL do seu backend

export const EditarImovel = () => {
  const { state } = useLocation();
  const { imovel } = state || {};

  const handleSubmit = async (formData) => {
    if (!formData.imovelId) {
      alert("ID do imóvel não encontrado");
      return;
    }

    try {
      const formPayload = new FormData();

      // Adiciona os campos do DTO no FormData
      Object.entries(formData).forEach(([key, value]) => {
        // Ignora os arquivos por enquanto
        if (key !== "files") formPayload.append(key, value ?? "");
      });

      // Adiciona as imagens separadamente
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => formPayload.append("files", file));
      }

      const response = await fetch(`${BASE_URL}/imoveis/update`, {
        method: "PUT", // PUT para atualizar
        body: formPayload,
        autorization: `Bearer ${localStorage.getItem("token")}`,
      });

      if (!response.ok) throw new Error("Erro ao atualizar imóvel");

      const updated = await response.json();
      alert("Imóvel atualizado com sucesso!");
      console.log("Atualizado:", updated);
    } catch (err) {
      console.error(err);
      alert("Falha ao atualizar o imóvel");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <Search imovel={imovel} onSubmit={handleSubmit} />
    </div>
  );
};
