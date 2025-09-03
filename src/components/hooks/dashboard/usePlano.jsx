import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";

export const usePlanos = () => {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPlanos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/planos/listar`, { signal });
        if (!res.ok) throw new Error("Erro ao buscar planos");
        const data = await res.json();
        setPlanos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlanos();

    return () => controller.abort();
  }, []);

  return { planos, loading, error };
};
