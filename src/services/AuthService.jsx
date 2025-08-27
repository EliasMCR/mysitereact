import { BASE_URL } from "../config";

export async function login(email, senha) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("Erro ao autenticar");
  }

  // Agora o backend retorna JSON { token, idImobiliaria }
  const data = await response.json();

  // Salva token e idImobiliaria no localStorage (ou state global)
  localStorage.setItem("token", data.token);
  localStorage.setItem("imobiliariaId", data.idImobiliaria);

  return data; // retorna { token, idImobiliaria }
}