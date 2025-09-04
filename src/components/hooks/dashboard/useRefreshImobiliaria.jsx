// hooks/useRefreshImobiliaria.js
import { useState } from "react";
import { BASE_URL } from "../../../config";

export const useRefreshImobiliaria = () => {
  const [loading, setLoading] = useState(false);

  const refreshImobiliaria = async () => {
    setLoading(true);
    try {
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      if (!imobiliariaId)
        throw new Error("ImobiliariaId não encontrado no localStorage");

      const res = await fetch(
        `${BASE_URL}/imobiliaria/info?id=${imobiliariaId}`
      );
      if (!res.ok) throw new Error("Erro ao buscar dados da imobiliária");

      const data = await res.json();

      const normalizedData = {
        id: data.id || "",
        nome: data.nome || "",
        cnpj: data.cnpj || "",
        email: data.email || "",
        telefone: data.telefone || "",
        senha: "",
        confirmarSenha: "",
        mensagemAviso: data.mensagemAviso || "",
        cidadeId: data.endereco?.cidadeId || "",
        bairroId: data.endereco?.bairroId || "",
        vilaId: data.endereco?.vilaId || "",
        rua: data.endereco?.rua || "",
        numero: data.endereco?.numero || "",
        cep: data.endereco?.cep || "",
        estadoId: data.endereco?.estadoId || "",
        plano: data.plano || "",
        estados: data.estado || [],
        cidades: data.cidade || [],
      };

      // Atualiza localStorage
      localStorage.setItem("imobiliariaData", JSON.stringify(normalizedData));

      return normalizedData;
    } catch (error) {
      console.error("Erro ao atualizar imobiliariaData:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { refreshImobiliaria, loading };
};
