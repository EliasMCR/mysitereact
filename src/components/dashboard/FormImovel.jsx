import { useState, useEffect } from "react";
import { useEnderecos } from "../hooks/dashboard/useEnderecos";
import { useEnderecoImob } from "../hooks/dashboard/useEnderecoImob";

export const FormImovel = ({ onSubmit }) => {
  const imobiliaria = JSON.parse(localStorage.getItem("imobiliariaData")) || [];

  // hook presonalizado que pega a lista de estados e cidades do local storage da propia imob
  const { estadosLocalStorage, cidadesLocalStorage } = useEnderecoImob();

  const {
    estados,
    cidades,
    bairros,
    vilas,
    loadCidades,
    loadBairros,
    loadVilas,
  } = useEnderecos();

  const initialFormData = {
    area: 99.0,
    titulo: "teste agora",
    valor: 500.0,
    banheiro: 1,
    quarto: 1,
    suite: 0,
    garagem: 0,
    lavanderia: false,
    churrasqueira: false,
    disponivel: true,
    aceitaPet: true,
    tipoImovel: "CASA",
    tipoTransacao: "ALUGUEL",
    imovelDestaque: false,
    descricao: "teste 2set 15:16",
    rua: "teste",
    numero: "44",
    bairroId: null,
    vilaId: null,
    cidadeId: null,
    estadoId: null,
    cep: "989000",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Cria previews quando files mudam
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  // Função auxiliar para classes de borda dinâmicas
  const getInputClass = (fieldName) => {
    const baseClasses =
      "border hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200 w-full";
    const value = formData[fieldName];
    // Um valor é válido se não for nulo, indefinido ou uma string vazia.
    // O número 0 é considerado um valor válido aqui (ex: 0 garagens).
    const isValid = value !== null && value !== undefined && value !== "";
    return `${baseClasses} ${isValid ? "border-green-500 bg-green-50" : "border-gray-400"}`;
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let val;

    if (type === "checkbox") {
      val = checked;
    } else if (type === "number") {
      val = value === "" ? null : Number(value);
    } else {
      val = value;
    }

    setFormData((prev) => ({ ...prev, [name]: val }));

    // Lógica de carregamento dependente de selects
    if (name === "estadoId") {
      setFormData((prev) => ({
        ...prev,
        cidadeId: null,
        bairroId: null,
        vilaId: null,
      }));
      if (val) await loadCidades(val);
    } else if (name === "cidadeId") {
      setFormData((prev) => ({ ...prev, bairroId: null, vilaId: null }));
      if (val) await loadBairros(val);
    } else if (name === "bairroId") {
      setFormData((prev) => ({ ...prev, vilaId: null }));
      if (val) await loadVilas(val);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = [...e.target.files];
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dtoData = {
      ...formData, // Espalha os valores atuais do formulário
      area: formData.area || 1.0,
      valor: formData.valor || 0,
      banheiro: formData.banheiro || 0,
      quarto: formData.quarto || 0,
      suite: formData.suite || 0,
      garagem: formData.garagem || 0,
      lavanderia: Boolean(formData.lavanderia),
      churrasqueira: Boolean(formData.churrasqueira),
      disponivel: Boolean(formData.disponivel),
      aceitaPet: Boolean(formData.aceitaPet),
      imovelDestaque: Boolean(formData.imovelDestaque),
    };

    const finalData = {
      ...dtoData,
      files,
    };

    if (onSubmit) onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-3xl mx-auto">
      {/* Transação e Tipo */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Tipo Transação <span className="text-red-500">*</span>
          </label>
          <select
            name="tipoTransacao"
            value={formData.tipoTransacao}
            onChange={handleChange}
            className={getInputClass("tipoTransacao")}
            required
          >
            <option value="ALUGUEL">Aluguel</option>
            <option value="VENDA">Venda</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Tipo imóvel <span className="text-red-500">*</span>
          </label>
          <select
            name="tipoImovel"
            value={formData.tipoImovel}
            onChange={handleChange}
            className={getInputClass("tipoImovel")}
            required
          >
            <option value="">-- Selecione --</option>
            <option value="CASA">CASA</option>
            <option value="APARTAMENTO">APARTAMENTO</option>
            <option value="SOBRADO">SOBRADO</option>
            <option value="KITNET">KITNET</option>
            <option value="CHACARA">CHÁCARA</option>
            <option value="SITIO">SÍTIO</option>
            <option value="FAZENDA">FAZENDA</option>
            <option value="TERRENO">TERRENO</option>
            <option value="DUPLEX">DUPLEX</option>
            <option value="TRIPLEX">TRIPLEX</option>
            <option value="LOJA">LOJA</option>
            <option value="GALPAO">GALPÃO</option>
            <option value="PREDIO">PRÉDIO</option>
            <option value="DEPOSITO">DEPÓSITO</option>
            <option value="AREA">ÁREA</option>
            <option value="ESTADIO">ESTÁDIO</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Valor (R$) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            name="valor"
            value={formData.valor || ""}
            onChange={handleChange}
            placeholder="0.00"
            className={getInputClass("valor")}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className={getInputClass("titulo")}
          />
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Endereço */}
      <section>
        <p className="font-semibold mb-3">Endereço</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-3">
            <label className="mb-1">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              name="estadoId"
              value={formData.estadoId || ""}
              onChange={handleChange}
              required
              className={getInputClass("estadoId")}
            >
              <option value="">-- selecione --</option>
              {(estadosLocalStorage && estadosLocalStorage.length > 0
                ? estadosLocalStorage
                : estados
              ).map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <label className="mb-1">
              Cidade <span className="text-red-500">*</span>
            </label>
            <select
              name="cidadeId"
              value={formData.cidadeId || ""}
              onChange={handleChange}
              required
              className={getInputClass("cidadeId")}
            >
              <option value="">-- selecione --</option>
              {(cidadesLocalStorage && cidadesLocalStorage.length > 0
                ? cidadesLocalStorage
                : cidades
              ).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <label className="mb-1">
              Bairro <span className="text-red-500">*</span>
            </label>
            <select
              name="bairroId"
              value={formData.bairroId || ""}
              onChange={handleChange}
              required
              className={getInputClass("bairroId")}
            >
              <option value="">-- selecione --</option>
              {bairros.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-3">
            <label className="mb-1">Vila</label>
            <select
              name="vilaId"
              value={formData.vilaId || ""}
              onChange={handleChange}
              className={getInputClass("vilaId")}
            >
              <option value="">-- selecione --</option>
              {vilas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nome}
                </option>
              ))}
            </select>

            <label className="mb-1">
              Rua <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              required
              className={getInputClass("rua")}
            />

            <label className="mb-1">
              Número <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              className={getInputClass("numero")}
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label className="mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className={getInputClass("cep")}
            />

            <label className="mb-1">
              Área (m²) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area"
              value={formData.area || ""}
              onChange={handleChange}
              required
              className={getInputClass("area")}
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Características */}
      <section>
        <p className="font-semibold mb-3">Características</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-3">
            <label className="mb-1">Quartos</label>
            <input
              type="number"
              name="quarto"
              value={formData.quarto ?? ""}
              onChange={handleChange}
              className={getInputClass("quarto")}
            />

            <label className="mb-1">Banheiros</label>
            <input
              type="number"
              name="banheiro"
              value={formData.banheiro ?? ""}
              onChange={handleChange}
              className={getInputClass("banheiro")}
            />

            <label className="mb-1">Garagem</label>
            <input
              type="number"
              name="garagem"
              value={formData.garagem ?? ""}
              onChange={handleChange}
              className={getInputClass("garagem")}
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label className="mb-1">Suíte</label>
            <input
              type="number"
              name="suite"
              value={formData.suite ?? ""}
              onChange={handleChange}
              className={getInputClass("suite")}
            />
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="disponivel"
                checked={!!formData.disponivel}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Imóvel Disponível
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="imovelDestaque"
                checked={!!formData.imovelDestaque}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Destaque
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="churrasqueira"
                checked={!!formData.churrasqueira}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Churrasqueira
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="lavanderia"
                checked={!!formData.lavanderia}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Lavanderia
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="aceitaPet"
                checked={!!formData.aceitaPet}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Aceita Pet
            </label>
          </div>
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Descrição */}
      <section>
        <label className="font-medium mb-1 block">Descrição</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className={`${getInputClass("descricao")} h-32 resize-y`}
        />
      </section>

      <hr className="border-gray-400" />

      {/* Upload */}
      <section>
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
        >
          <span className="material-symbols-outlined text-3xl">
            photo_camera
          </span>
          <span className="mt-2 text-sm">
            Selecione as imagens do imóvel{" "}
            <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Previews com botão de remoção */}
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Botão */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Criar Imóvel
        </button>
      </div>
    </form>
  );
};
