// hooks/useEnderecos.js
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../config";

export const useEnderecos = () => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [vilas, setVilas] = useState([]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const res = await fetch(`${BASE_URL}/endereco/estado`);
        if (res.ok) {
          const data = await res.json();
          setEstados(data);
        }
      } catch (err) {
        console.error("Erro ao carregar estados:", err);
      }
    };

    fetchEstados();
  }, []);

  const loadCidades = async (estadoId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/cidade/listaCidades?idEstado=${estadoId}`
      );
      if (res.ok) {
        const data = await res.json();
        setCidades(data);
      }
    } catch (err) {
      console.error("Erro ao carregar cidades:", err);
    }
  };

  const loadBairros = async (cidadeId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/bairros?cidadeId=${cidadeId}`
      );
      if (res.ok) {
        const data = await res.json();
        setBairros(data);
      }
    } catch (err) {
      console.error("Erro ao carregar bairros:", err);
    }
  };

  const loadVilas = async (bairroId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/vilas?bairroId=${bairroId}`
      );
      if (res.ok) {
        const data = await res.json();
        setVilas(data);
      }
    } catch (err) {
      console.error("Erro ao carregar vilas:", err);
    }
  };

  return {
    estados,
    cidades,
    bairros,
    vilas,
    loadCidades,
    loadBairros,
    loadVilas,
    setCidades,
    setBairros,
    setVilas,
  };
};
