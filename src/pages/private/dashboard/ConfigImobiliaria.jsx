import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";

export const ConfigImobiliaria = () => {
  const [imobiliaria, setImobiliaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState({}); // Dados originais para comparação

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
    estado: "",
    plano: "",
  });

  useEffect(() => {
    const fetchImobiliaria = async () => {
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      if (!imobiliariaId) return;

      try {
        const res = await fetch(
          `${BASE_URL}/imobiliaria/info?id=${imobiliariaId}`
        );
        if (!res.ok) throw new Error("Erro ao buscar imobiliária");
        const data = await res.json();
        setImobiliaria(data);

        // Dados originais normalizados
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
          estado: data.endereco?.estado || "",
          plano: data.plano || "",
        };

        // Salva os dados originais para comparação
        setOriginalData(normalizedData);
        // Popula formData com dados do backend
        setFormData(normalizedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImobiliaria();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para identificar apenas os campos alterados
  const getChangedFields = () => {
    const changedFields = {};

    Object.keys(formData).forEach((key) => {
      // Para senha, sempre inclui se não estiver vazia
      if (key === "senha" || key === "confirmarSenha") {
        if (formData[key] !== "") {
          changedFields[key] = formData[key];
        }
      } else {
        // Para outros campos, compara com o valor original
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      }
    });

    return changedFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = getChangedFields();

    // Verifica se há campos alterados
    if (Object.keys(changedFields).length === 0) {
      console.log("Nenhum campo foi alterado");
      alert("Nenhuma alteração foi detectada!");
      return;
    }

    // Validação de senhas se foram alteradas
    if (changedFields.senha || changedFields.confirmarSenha) {
      if (changedFields.senha !== changedFields.confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }
      // Remove confirmarSenha do envio, deixa apenas senha
      delete changedFields.confirmarSenha;
    }

    console.log("Enviando apenas campos alterados:", changedFields);

    try {
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      const res = await fetch(`${BASE_URL}/imobiliaria/update`, {
        method: "PUT", // ou PUT, dependendo da sua API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: imobiliariaId,
          ...changedFields,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar imobiliária");

      // Atualiza os dados originais com os novos valores após sucesso
      setOriginalData((prev) => ({ ...prev, ...changedFields }));

      // Limpa os campos de senha após atualização bem-sucedida
      if (changedFields.senha) {
        setFormData((prev) => ({ ...prev, senha: "", confirmarSenha: "" }));
      }

      alert("Configurações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar configurações!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h3 className="text-2xl font-semibold mb-4">Configurações</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Nome Imobiliária:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">CNPJ:</label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Telefone:</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(xx) xxxxx-xxxx"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nova Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Deixe vazio para não alterar"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Confirmar Nova Senha:
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme a nova senha"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Mensagem de aviso:</label>
            <input
              type="text"
              name="mensagemAviso"
              value={formData.mensagemAviso}
              onChange={handleChange}
              placeholder="Mensagem de aviso do seu site"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block font-medium mb-1">Cidade:</label>
            <select
              name="cidadeId"
              value={formData.cidadeId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Selecione a cidade</option>
              {/* Aqui você pode mapear cidades */}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Bairro:</label>
            <select
              name="bairroId"
              value={formData.bairroId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Selecione o bairro</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Vila (opcional):</label>
            <select
              name="vilaId"
              value={formData.vilaId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Selecione a vila</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Rua:</label>
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Número:</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">CEP:</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Estado:</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <input type="hidden" name="plano" value={formData.plano} />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};
