import { useState } from "react";
import { FormImovel } from "../../../components/dashboard/FormImovel";
import { BASE_URL } from "../../../config";

export const CriarImovel = () => {
  const [loading, setLoading] = useState(false);

  const criarImovel = async (dados) => {
    try {
      setLoading(true); // inicia o carregamento

      const arquivos = dados.files || [];
      delete dados.files;

      // Validação básica
      const obrigatorios = [
        "tipoTransacao",
        "tipoImovel",
        "valor",
        "titulo",
        "estadoId",
        "cidadeId",
        "bairroId",
        "vilaId",
      ];

      for (const campo of obrigatorios) {
        if (!dados[campo] || dados[campo].toString().trim() === "") {
          throw new Error(`O campo ${campo} é obrigatório.`);
        }
      }

      let urlsImagens = [];

      // 1) envia imagens em lotes de 5
      for (let i = 0; i < arquivos.length; i += 5) {
        const lote = arquivos.slice(i, i + 5);
        const formData = new FormData();
        lote.forEach((file) => formData.append("listaImg", file));

        const response = await fetch(`${BASE_URL}/imoveis/uploadImg`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const erroText = await response.text();
          throw new Error(`Erro ao enviar imagens: ${erroText}`);
        }

        const result = await response.json();
        urlsImagens = [...urlsImagens, ...result];
      }

      // 2) envia dados do imóvel
      const responseCadastro = await fetch(`${BASE_URL}/imoveis/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...dados, imagensImovel: urlsImagens }),
      });

      if (!responseCadastro.ok) {
        const erroText = await responseCadastro.text();
        throw new Error(`Erro ao cadastrar imóvel: ${erroText}`);
      }

      const resultCadastro = await responseCadastro.text();
      console.log("Imóvel cadastrado com sucesso:", resultCadastro);
      alert(resultCadastro);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false); // finaliza o carregamento
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <p className="p-4 text-4xl text-gray-500">Novo imóvel</p>
        <FormImovel onSubmit={criarImovel} />
      </div>
    </div>
  );
};
