// hooks/useImobiliariaData.js
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../config';

export const useImobiliariaData = () => {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState({});

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchImobiliaria = async () => {
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      if (!imobiliariaId) return;

      try {
        const res = await fetch(`${BASE_URL}/imobiliaria/info?id=${imobiliariaId}`);
        if (!res.ok) throw new Error("Erro ao buscar imobiliária");
        const data = await res.json();
        setImobiliaria(data);

        const normalizedData = {
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
        };

        setOriginalData(normalizedData);
        setFormData(normalizedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImobiliaria();
  }, []);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    imobiliaria,
    loading,
    originalData,
    formData,
    updateFormData,
    setOriginalData
  };
};