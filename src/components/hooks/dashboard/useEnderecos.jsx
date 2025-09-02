// hooks/useEnderecos.js
import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../../config";

export const useEnderecos = () => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [vilas, setVilas] = useState([]);

  // Caches em memória (não resetam entre renders)
  const cidadesCache = useRef(new Map());
  const bairrosCache = useRef(new Map());
  const vilasCache = useRef(new Map());

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
    if (cidadesCache.current.has(estadoId)) {
      setCidades(cidadesCache.current.get(estadoId));
      return;
    }
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/cidade/listaCidades?idEstado=${estadoId}`
      );
      if (res.ok) {
        const data = await res.json();
        cidadesCache.current.set(estadoId, data);
        setCidades(data);

      }
    } catch (err) {
      console.error("Erro ao carregar cidades:", err);
    }
  };

  const loadBairros = async (cidadeId) => {
    if (bairrosCache.current.has(cidadeId)) {
      setBairros(bairrosCache.current.get(cidadeId));
      return;
    }
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/bairros?cidadeId=${cidadeId}`
      );
      if (res.ok) {
        const data = await res.json();
        bairrosCache.current.set(cidadeId, data);
        setBairros(data);

      }
    } catch (err) {
      console.error("Erro ao carregar bairros:", err);
    }
  };

  const loadVilas = async (bairroId) => {
    if (vilasCache.current.has(bairroId)) {
      setVilas(vilasCache.current.get(bairroId));
      return;
    }
    try {
      const res = await fetch(
        `${BASE_URL}/endereco/vilas?bairroId=${bairroId}`
      );
      if (res.ok) {
        const data = await res.json();
        vilasCache.current.set(bairroId, data);
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
