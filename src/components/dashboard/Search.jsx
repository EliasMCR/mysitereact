import { useState, useEffect } from "react";
import { FormImovel } from "./FormImovel";
import { BASE_URL } from "../../config";
import { FormImovelUpdate } from "./FormImovelUpdate";

export const Search = ({ imovel: imovelProp = null }) => {
  const [imovel, setImovel] = useState(imovelProp);
  const [idPesquisa, setIdPesquisa] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imobiliaria = JSON.parse(localStorage.getItem("imobiliariaData")) || {};
  const idImobiliaria = imobiliaria.id || "";

  // Se a prop mudar, atualiza o estado
  useEffect(() => {
    setImovel(imovelProp);
  }, [imovelProp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idPesquisa) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/imoveis/buscar?idImovel=${idPesquisa}&idImobiliaria=${idImobiliaria}`
      );
      if (!response.ok) throw new Error("Imóvel não encontrado");

      const data = await response.json();
      setImovel(data); // envia o resultado para o FormImovel
    } catch (err) {
      console.error(err);
      setImovel(null);
      alert("Imóvel não encontrado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setImovel(null);
    setIdPesquisa("");
  };

  // Determina se deve mostrar o FormImovel
  const shouldShowForm = imovel !== null;

  return (
    <div className="min-h-screen bg-white p-4">
      <form
        className="bg-blue-500 p-4 rounded flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="pesquisa" className="text-white font-medium">
          Digite o ID do imóvel:
        </label>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="number"
            name="pesquisa"
            id="pesquisa"
            className="bg-white rounded p-2 flex-1 min-w-[150px]"
            value={idPesquisa}
            onChange={(e) => setIdPesquisa(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button
              className="bg-blue-400 p-2 rounded text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading || !idPesquisa}
            >
              {isLoading ? "Pesquisando..." : "Pesquisar"}
            </button>
            {shouldShowForm && (
              <button
                className="bg-red-500 p-2 rounded text-white hover:bg-red-600 transition"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-6">
        {shouldShowForm ? (
          <FormImovelUpdate imovel={imovel} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            <p>Pesquise por um imóvel para visualizar o formulário</p>
          </div>
        )}
      </div>
    </div>
  );
};
