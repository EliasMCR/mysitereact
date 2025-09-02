import { useState } from "react";
import { BASE_URL } from "../../../config";

export const useSalvarImagens = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const salvarImagens = async (arquivos) => {
    try {
      setLoading(true);
      setError(null);

      if (!arquivos || arquivos.length === 0) {
        return [];
      }

      let urlsImagens = [];

      // Upload em lotes de 5 imagens
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
          throw new Error(`Erro ao salvar imagens: ${erroText}`);
        }

        const result = await response.json();
        urlsImagens = [...urlsImagens, ...result];
      }

      return urlsImagens;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    salvarImagens,
    clearError: () => setError(null),
  };
};
