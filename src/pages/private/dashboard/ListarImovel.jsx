import { useState, useEffect } from "react";
import { BASE_URL } from "../../../config";
import { Card } from "../../../components/dashboard/Card";


export const ListarImovel = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const size = 10;

  const fetchImoveis = async (currentPage = 0) => {
    try {
      setLoading(true);
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      if (!imobiliariaId) throw new Error("Usuário não autenticado");

      const res = await fetch(
        `${BASE_URL}/imoveis/listar?idImobiliaria=${imobiliariaId}&page=${currentPage}&size=${size}&sort=id,asc`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const backendMessage = errorData?.message || "Erro desconhecido";
        throw new Error(backendMessage);
      }

      const data = await res.json();
      const novosImoveis = data.content || data;

      // Mescla evitando duplicados (garantindo imóveis únicos por ID)
      setImoveis((prev) => {
        const map = new Map();
        [...prev, ...novosImoveis].forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
      });

      // Atualiza flag de mais páginas
      setHasMore(novosImoveis.length === size);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis(0);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-red-500">Erro: {error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {imoveis.length > 0 ? (
        <Card imoveis={imoveis} />
      ) : (
        <div className="text-gray-500 text-center py-6">
          Nenhum imóvel encontrado.
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-4">
          <span className="animate-pulse text-gray-600">Carregando...</span>
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center py-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => fetchImoveis(page)}
          >
            Carregar mais imóveis
          </button>
        </div>
      )}
    </div>
  );
};
