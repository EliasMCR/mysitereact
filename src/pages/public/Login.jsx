import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarMe, setLembrarMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setLembrarMe(true); // marca checkbox automaticamente
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token); // 🔑 salva token
      localStorage.setItem("imobiliariaId", data.id); // 🔑 salva token
      if (lembrarMe) {
        // salva o input email
        localStorage.setItem("email", email); // salva email
      } else {
        localStorage.removeItem("email"); // remove caso não queira lembrar
      }

      navigate("/dashboard"); // redireciona para painel
    } catch (error) {
      alert("Email ou senha inválidos!" + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        id="formLogin"
        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* Ícone */}
        <div className="flex justify-center mb-2">
          <span className="material-symbols-outlined text-blue-600 text-5xl">
            account_box
          </span>
        </div>

        <h1 className="text-xl font-semibold text-center text-gray-800">
          Faça seu login para acessar o painel imobiliário
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="inputEmail"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="seuEmail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col">
          <label
            htmlFor="inputPassword"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {/* Checkbox + Link */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              id="lembrarMe"
              name="lembrarMe"
              checked={lembrarMe}
              onChange={(e) => setLembrarMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            Lembrar-me
          </label>
          <a href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
        >
          Entrar
        </button>

        {/* Rodapé */}
        <p className="text-xs text-gray-500 text-center mt-2">
          Magui Sistemas © 2025
        </p>
      </form>
    </div>
  );
}
