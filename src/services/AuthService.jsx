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

  const token = await response.text(); // <-- aqui
  return { token }; // cria objeto com token
}
