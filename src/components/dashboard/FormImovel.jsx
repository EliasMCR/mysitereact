import { useState, useEffect, useMemo } from "react";
import { useEnderecos } from "../hooks/dashboard/useEnderecos";

export const FormImovel = ({ imovel = {}, onSubmit }) => {
  const {
    estados,
    cidades,
    bairros,
    vilas,
    loadCidades,
    loadBairros,
    loadVilas,
  } = useEnderecos();

  const initialFormData = useMemo(
    () => ({
      // Campos do DTO
      imovelId: imovel.imovelId || null,
      area: imovel.area ?? 99.0,
      titulo: imovel.titulo || "teste",
      valor: imovel.valor ?? 99.0,
      banheiro: imovel.banheiro ?? 1,
      quarto: imovel.quarto ?? 2,
      suite: imovel.suite ?? 0,
      garagem: imovel.garagem ?? 0,
      lavanderia: imovel.lavanderia ?? false,
      churrasqueira: imovel.churrasqueira ?? false,
      disponivel: imovel.disponivel ?? true,
      aceitaPet: imovel.aceitaPet ?? true,
      tipoImovel: imovel.tipoImovel || "CASA",
      tipoTransacao: imovel.tipoTransacao || "ALUGUEL",
      imovelDestaque: imovel.imovelDestaque ?? false,
      descricao: imovel.descricao || "TESTE",

      // Endereço - campos diretos no DTO
      rua: imovel.rua || imovel.endereco?.rua || "",
      numero: imovel.numero || imovel.endereco?.numero || "",
      bairroId: imovel.bairroId || imovel.endereco?.bairroId || null,
      vilaId: imovel.vilaId || imovel.endereco?.vilaId || null,
      cidadeId: imovel.cidadeId || imovel.endereco?.cidadeId || null,
      estadoId: imovel.estadoId || imovel.endereco?.estadoId || null,
      cep: imovel.cep || imovel.endereco?.cep || "",
    }),
    [
      imovel.imovelId,
      imovel.area,
      imovel.titulo,
      imovel.valor,
      imovel.banheiro,
      imovel.quarto,
      imovel.suite,
      imovel.garagem,
      imovel.lavanderia,
      imovel.churrasqueira,
      imovel.disponivel,
      imovel.aceitaPet,
      imovel.tipoImovel,
      imovel.tipoTransacao,
      imovel.imovelDestaque,
      imovel.descricao,
      imovel.rua,
      imovel.numero,
      imovel.bairroId,
      imovel.vilaId,
      imovel.cidadeId,
      imovel.estadoId,
      imovel.cep,
      imovel.endereco?.rua,
      imovel.endereco?.numero,
      imovel.endereco?.bairroId,
      imovel.endereco?.vilaId,
      imovel.endereco?.cidadeId,
      imovel.endereco?.estadoId,
      imovel.endereco?.cep,
    ]
  );

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Atualiza apenas quando os valores iniciais realmente mudarem
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  // cria previews quando files mudam
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  // carrega cidades se estadoId mudar (edicao)
  useEffect(() => {
    if (formData.estadoId) {
      loadCidades(formData.estadoId);
    }
  }, [formData.estadoId]);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let val;

    if (type === "checkbox") {
      val = checked;
    } else if (type === "number") {
      // Para campos numéricos, converte para null se vazio
      val = value === "" ? null : Number(value);
    } else {
      val = value;
    }

    setFormData((prev) => ({ ...prev, [name]: val }));

    // lógica de carregamento dependente de selects
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
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepara os dados conforme o DTO esperado
    const dtoData = {
      // Se for edição, inclui o ID
      ...(formData.imovelId && { imovelId: formData.imovelId }),

      // Campos obrigatórios com valores padrão
      area: formData.area || 1.0, // Double não pode ser null se obrigatório
      titulo: formData.titulo,
      valor: formData.valor || 0, // BigDecimal
      banheiro: formData.banheiro || 0,
      quarto: formData.quarto || 0,
      suite: formData.suite || 0,
      garagem: formData.garagem || 0,

      // Booleanos
      lavanderia: Boolean(formData.lavanderia),
      churrasqueira: Boolean(formData.churrasqueira),
      disponivel: Boolean(formData.disponivel),
      aceitaPet: Boolean(formData.aceitaPet),
      imovelDestaque: Boolean(formData.imovelDestaque),

      // Strings
      tipoImovel: formData.tipoImovel,
      tipoTransacao: formData.tipoTransacao,
      descricao: formData.descricao,

      // Endereço - campos diretos no DTO
      rua: formData.rua,
      numero: formData.numero,
      bairroId: formData.bairroId,
      vilaId: formData.vilaId,
      cidadeId: formData.cidadeId,
      estadoId: formData.estadoId,
      cep: formData.cep,
    };

    // Adiciona os arquivos separadamente para o componente pai tratar
    const finalData = {
      ...dtoData,
      files, // Para o componente pai processar as imagens
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
            className="border border-gray-400 hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200"
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
            className="border border-gray-400 hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200"
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
            className="border border-gray-400 hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200"
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
            className="border border-gray-400 hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </section>

      <hr />

      {/* Endereço */}
      <section>
        <p className="font-semibold mb-3">Endereço</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              name="estadoId"
              value={formData.estadoId || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
              {estados.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <label className="mb-1 mt-3">
              Cidade <span className="text-red-500">*</span>
            </label>
            <select
              name="cidadeId"
              value={formData.cidadeId || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
              {cidades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <label className="mb-1 mt-3">
              Bairro <span className="text-red-500">*</span>
            </label>
            <select
              name="bairroId"
              value={formData.bairroId || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
              {bairros.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Vila</label>
            <select
              name="vilaId"
              value={formData.vilaId || ""}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
              {vilas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nome}
                </option>
              ))}
            </select>

            <label className="mb-1 mt-3">
              Rua <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">
              Número <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">
              Área (m²) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              name="area"
              value={formData.area || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />
          </div>
        </div>
      </section>

      <hr />

      {/* Características */}
      <section>
        <p className="font-semibold mb-3">Características</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1">Quartos</label>
            <input
              type="number"
              name="quarto"
              value={formData.quarto || ""}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">Banheiros</label>
            <input
              type="number"
              name="banheiro"
              value={formData.banheiro || ""}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">Garagem</label>
            <input
              type="number"
              name="garagem"
              value={formData.garagem || ""}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Suíte</label>
            <input
              type="number"
              name="suite"
              value={formData.suite || ""}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />
          </div>

          <div className="flex flex-col space-y-2">
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

      <hr />

      {/* Descrição */}
      <section>
        <label className="font-medium mb-1 block">Descrição</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full border border-gray-400 hover:border-blue-500 rounded p-3 h-32 resize-y"
        />
      </section>

      <hr />

      {/* Upload */}
      <section>
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
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

        {/* previews */}
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </section>

      {/* Botão */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {formData.imovelId ? "Atualizar Imóvel" : "Postar Imóvel"}
        </button>
      </div>
    </form>
  );
};
