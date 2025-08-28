import { useState, useEffect } from "react";
import { BASE_URL } from "../../../config";
import { Card } from "../../../components/dashboard/Card";

export const ListarImovel = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const imobiliariaId = localStorage.getItem("imobiliariaId"); // pega sempre atual
        if (!imobiliariaId) throw new Error("Usuário não autenticado");
        const res = await fetch(
          `${BASE_URL}/imoveis/listar?idImobiliaria=${imobiliariaId}&page=0&size=10&sort=valor,asc`
        );

        if (!res.ok) {
          // tenta extrair a mensagem do backend
          const errorData = await res.json().catch(() => null);
          const backendMessage = errorData?.message || "Erro desconhecido";
          throw new Error(backendMessage);
        }

        const data = await res.json();
        setImoveis(data.content || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <span className="text-lg text-gray-600 animate-pulse">
          Carregando imóveis...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-red-500">Erro: {error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {imoveis.length > 0 ? (
        <Card imoveis={imoveis} />
      ) : (
        <div className="flex items-center justify-center p-6 text-gray-500">
          Nenhum imóvel encontrado.
        </div>
      )}
    </div>
  );
};
