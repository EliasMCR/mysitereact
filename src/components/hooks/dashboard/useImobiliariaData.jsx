// hooks/useImobiliariaData.js
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../config";

export const useImobiliariaData = () => {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    mensagemAviso: "",
    cidadeId: "",
    bairroId: "",
    vilaId: "",
    rua: "",
    numero: "",
    cep: "",
    estadoId: "",
    plano: "",
    estados: [], // array completo de estados
    cidades: [], // array completo de cidades
  });

  useEffect(() => {
    const fetchImobiliaria = async () => {
      const imobiliariaId = localStorage.getItem("imobiliariaId"); //adicionado pelo login
      if (!imobiliariaId) return;

      try {
        const res = await fetch(
          `${BASE_URL}/imobiliaria/info?id=${imobiliariaId}`
        );
        if (!res.ok) throw new Error("Erro ao buscar imobiliária");
        const data = await res.json();
        setImobiliaria(data);

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
          estados: data.estado || [], // array de estados do backend
          cidades: data.cidade || [], // array de cidades do backend
        };

        setOriginalData(normalizedData);
        setFormData(normalizedData);

        // salva no localStorage para usar em outros componentes
        localStorage.setItem("imobiliariaData", JSON.stringify(normalizedData));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImobiliaria();
  }, []);

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return {
    imobiliaria,
    loading,
    originalData,
    formData,
    updateFormData,
    setOriginalData,
  };
};
