import { useEffect, useState } from "react";

export const useEnderecoImob = () => {
  const [estadosLocalStorage, setEstados] = useState([]);
  const [cidadesLocalStorage, setCidades] = useState([]);

  useEffect(() => {
    const imobiliaria = JSON.parse(localStorage.getItem("imobiliariaData")) || {};
    const estadosLocal = imobiliaria.estados || [];
    const cidadesLocal = imobiliaria.cidades || [];

    if (estadosLocal.length > 0) setEstados(estadosLocal);
    if (cidadesLocal.length > 0) setCidades(cidadesLocal);
  }, []);

  return { estadosLocalStorage, cidadesLocalStorage };
};
