import { useState } from "react";
import { FormImovel } from "../../../components/dashboard/FormImovel";
import { BASE_URL } from "../../../config";
import { useSalvarImagens } from "../../../components/hooks/dashboard/useSalvarImagens";

export const CriarImovel = () => {
  const [loading, setLoading] = useState(false);
  const {
    loading: loadingImagens,
    error,
    salvarImagens,
    clearError,
  } = useSalvarImagens();

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
      ];

      for (const campo of obrigatorios) {
        if (!dados[campo] || dados[campo].toString().trim() === "") {
          throw new Error(`O campo ${campo} é obrigatório.`);
        }
      }

      // Usar o hook para salvar imagens
      const urlsImagens = await salvarImagens(arquivos);
      console.log("URLs das imagens salvas:", urlsImagens);

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

  const isLoading = loading || loadingImagens;

  return (
    <div className="min-h-screen relative text-gray-800">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button onClick={clearError} className="ml-2 underline">
            Fechar
          </button>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <p className="p-4 text-4xl text-blue-500">Novo imóvel</p>
        <FormImovel onSubmit={criarImovel} />
      </div>
    </div>
  );
};
