import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { Spinner } from "../../components/ui/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarMe, setLembrarMe] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅ estado de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setLembrarMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅ inicia o loading
    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token);
      localStorage.setItem("imobiliariaId", data.id);

      if (lembrarMe) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Email ou senha inválidos!" + error);
    } finally {
      setLoading(false); // ⬅ encerra o loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {loading ? (
        <Spinner size={48} color="#155dfc" /> // ⬅ mostra só quando estiver carregando
      ) : (
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
      )}
    </div>
  );
}
