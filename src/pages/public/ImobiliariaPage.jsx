import { useState } from "react";
import { useEnderecos } from "../../components/hooks/dashboard/useEnderecos";
import { usePlanos } from "../../components/hooks/dashboard/usePlano";
import { BASE_URL } from "../../config";

export const ImobiliariaPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { planos, loading, error } = usePlanos();
  const {
    estados,
    cidades,
    bairros,
    vilas,
    loadCidades,
    loadBairros,
    loadVilas,
  } = useEnderecos();

  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    senha: "",
    endereco: {
      estadoId: "",
      cidadeId: "",
      bairroId: "",
      vilaId: "",
      rua: "",
      numero: "",
      cep: "",
    },
    plano: "",
  });

  // Atualizar formData
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("endereco.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }));

      // Encadeamento de selects
      if (field === "estadoId") {
        loadCidades(value);
        setFormData((prev) => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            estadoId: value,
            cidadeId: "",
            bairroId: "",
            vilaId: "",
          },
        }));
      }
      if (field === "cidadeId") {
        loadBairros(value);
        setFormData((prev) => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            cidadeId: value,
            bairroId: "",
            vilaId: "",
          },
        }));
      }
      if (field === "bairroId") {
        loadVilas(value);
        setFormData((prev) => ({
          ...prev,
          endereco: { ...prev.endereco, bairroId: value, vilaId: "" },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text(); // pega como texto
      let data;

      // tenta parsear JSON só se for JSON válido
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        // pega mensagem do JSON ou usa texto puro
        throw new Error(
          (data && (data.message || data.error)) || text || "Erro ao cadastrar"
        );
      }

      alert(
        "Imobiliária cadastrada com sucesso! Aguarde a aprovação do cadastro!"
      );
      window.location.href = "/login";
    } catch (err) {
      console.error("Erro:", err.message);
      alert(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col lg:gap-5 justify-center min-h-screen bg-gray-100 py-6 px-4 text-gray-700 items-center">
      {/* Seção de boas-vindas */}
      <section className="w-full lg:w-4/5 mb-6 lg:mb-0">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center text-center">
            <p>Bem-vindo à plataforma imobiliaria MaguiSites</p>
          </h2>
          <p className="text-lg mb-2">
            Nosso sistema imobiliário foi desenvolvido com tecnologia de última
            geração e criptografia ponta a ponta.
          </p>
          <p className="text-lg mb-2">
            As imagens dos imóveis são hospedadas na AWS com CDN rápido e
            confiável.
          </p>
          <p className="text-lg mb-2">
            Os sites são construídos em React, tecnologia criada e utilizada
            pelo Facebook (atual Meta), amplamente adotada no mercado por sua
            performance, reutilização de componentes e pela experiência fluida
            de navegação sem recarregamentos completos de página (Single Page
            Application).
          </p>
          <p className="text-lg mb-2">
            Você pode escolher entre layouts prontos <strong>gratuitos</strong>{" "}
            ou personalizados por <strong>R$250,00/página</strong>.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <main className="w-full lg:w-4/5">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-6 flex-wrap"
            autoComplete="off"
          >
            {/* Coluna de dados */}
            <div className="flex-1">
              <h1 className="text-xl font-semibold mb-4">Cadastro</h1>

              {/* Inputs */}
              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Nome da Imobiliária *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg p-2 border-gray-400"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">CNPJ *</label>
                <input
                  type="number"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg p-2 border-gray-400"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg p-2 border-gray-400"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg p-2 border-gray-400"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Senha *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg p-2 border-gray-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-4">Endereço</h2>

              {/* Selects encadeados */}
              <select
                name="endereco.estadoId"
                value={formData.endereco.estadoId}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              >
                <option value="">Selecione o estado</option>
                {estados.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>

              <select
                name="endereco.cidadeId"
                value={formData.endereco.cidadeId}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              >
                <option value="">Selecione a cidade</option>
                {cidades.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>

              <select
                name="endereco.bairroId"
                value={formData.endereco.bairroId}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              >
                <option value="">Selecione o bairro</option>
                {bairros.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nome}
                  </option>
                ))}
              </select>

              <select
                name="endereco.vilaId"
                value={formData.endereco.vilaId}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
              >
                <option value="">Selecione a vila (opcional)</option>
                {vilas.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.nome}
                  </option>
                ))}
              </select>

              {/* Inputs simples */}
              <input
                type="text"
                name="endereco.rua"
                placeholder="Rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              />
              <input
                type="text"
                name="endereco.numero"
                placeholder="Número"
                value={formData.endereco.numero}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              />
              <input
                type="text"
                name="endereco.cep"
                placeholder="CEP"
                value={formData.endereco.cep}
                onChange={handleChange}
                className="mb-3 w-full border rounded-lg p-2 border-gray-400"
                required
              />
            </div>

            {/* Coluna de plano */}
            {/* Coluna de plano */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Plano</h3>

              {loading && (
                <p className="text-gray-500 mt-2">Carregando planos...</p>
              )}
              {error && (
                <p className="text-red-500 mt-2">
                  Erro ao carregar planos, entre em contato 5555997058002
                </p>
              )}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {planos.map((plano) => (
                  <div
                    key={plano.id}
                    className={`cursor-pointer border rounded-xl p-4 shadow-sm hover:shadow-md transition ${
                      formData.plano === plano.id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, plano: plano.id }))
                    }
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {plano.nome}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Até {plano.limiteImoveis} imóveis
                    </p>
                    <p className="text-green-600 font-bold mt-2">
                      {plano.valor === 0
                        ? "Gratuito"
                        : `R$ ${plano.valor.toFixed(2)}/mês`}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-green-600 text-center mt-2 font-bold">
                {formData.plano &&
                  `Plano selecionado: ${
                    planos.find((p) => p.id === formData.plano)?.nome || ""
                  }`}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-2 mt-6 hover:bg-green-700 transition"
              >
                Cadastrar
              </button>

              <p className="text-gray-500 text-center mt-2">
                Magui Sistemas @2025
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
