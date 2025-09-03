import { useState } from "react";
import { BASE_URL } from "../../../config";

export const useDeleteImovel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  const deleteImovel = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // envia o id como request param na URL
      const res = await fetch(`${BASE_URL}/imoveis/apagar?idImovel=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
            "Erro ao deletar imóvel"
        );
      }

      setSuccess(true);
      return data || text || "Imóvel deletado com sucesso!";
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteImovel, loading, error, success };
};
