import { useState } from "react";
import { useEnderecos } from "../hooks/dashboard/useEnderecos";

export const SecaoAddAreaAtuacao = ({ onAddCidade }) => {
  const { estados, cidades, loadCidades, setCidades } = useEnderecos();
  const imobiliaria = JSON.parse(localStorage.getItem("imobiliariaData")) || [];
  const cidadesLocalStorage = imobiliaria?.cidades || [];

  const [estadoId, setEstadoId] = useState("");
  const [cidadeId, setCidadeId] = useState("");

  const handleEstadoChange = async (e) => {
    const value = e.target.value;
    setEstadoId(value);
    setCidadeId("");
    setCidades([]);
    if (value) {
      await loadCidades(value);
    }
  };

  const handleAddCidade = () => {
    if (!cidadeId) {
      alert("Selecione uma cidade!");
      return;
    }
    onAddCidade(cidadeId);
    setCidadeId("");
  };

  return (
    <section className="md:col-span-2 mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Adicionar Cidade
      </h3>

      {/* Seleção de Estado */}
      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <select
          value={estadoId}
          onChange={handleEstadoChange}
          className="border p-2 rounded-md flex-1"
        >
          <option value="">-- Selecione um estado --</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.name} ({estado.sigla})
            </option>
          ))}
        </select>
      </div>

      {/* Seleção de Cidade */}
      {estadoId && (
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={cidadeId}
            onChange={(e) => setCidadeId(e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">-- Selecione uma cidade --</option>
            {cidades
              .filter(
                (cidade) =>
                  !cidadesLocalStorage.some(
                    (c) => String(c.id) === String(cidade.id) // garante comparação de tipo também
                  )
              )
              .map((cidade) => (
                <option key={cidade.id} value={cidade.id}>
                  {cidade.nome}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={handleAddCidade}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Adicionar
          </button>
        </div>
      )}
    </section>
  );
};
