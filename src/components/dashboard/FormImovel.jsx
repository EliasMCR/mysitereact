import { useState, useEffect, useMemo } from "react";

export const FormImovel = ({ imovel = {}, onSubmit }) => {
  // Memoiza os valores iniciais para evitar recriação desnecessária
  const initialFormData = useMemo(() => ({
    tipoTransacao: imovel.tipoTransacao || "ALUGUEL",
    tipoImovel: imovel.tipoImovel || "",
    valor: imovel.valor ?? "",
    titulo: imovel.titulo || "",
    estado: imovel.estado || "",
    cidadeId: imovel.cidadeId || "",
    bairroId: imovel.bairroId || "",
    vilaId: imovel.vilaId || "",
    rua: imovel.rua || "",
    numero: imovel.numero ?? "",
    cep: imovel.cep || "",
    quarto: imovel.quarto ?? 0,
    banheiro: imovel.banheiro ?? 0,
    garagem: imovel.garagem ?? 0,
    suite: imovel.suite ?? 0,
    area: imovel.area ?? "",
    disponivel: imovel.disponivel ?? true,
    imovelDestaque: imovel.imovelDestaque ?? false,
    churrasqueira: imovel.churrasqueira ?? false,
    lavanderia: imovel.lavanderia ?? false,
    aceitaPet: imovel.aceitaPet ?? false,
    descricao: imovel.descricao || "",
  }), [
    // Dependências específicas ao invés do objeto inteiro
    imovel.tipoTransacao,
    imovel.tipoImovel,
    imovel.valor,
    imovel.titulo,
    imovel.estado,
    imovel.cidadeId,
    imovel.bairroId,
    imovel.vilaId,
    imovel.rua,
    imovel.numero,
    imovel.cep,
    imovel.quarto,
    imovel.banheiro,
    imovel.garagem,
    imovel.suite,
    imovel.area,
    imovel.disponivel,
    imovel.imovelDestaque,
    imovel.churrasqueira,
    imovel.lavanderia,
    imovel.aceitaPet,
    imovel.descricao,
  ]);

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

  const handleChange = (e) => {
    const { name, type, checked, value: rawValue } = e.target;
    let value;

    if (type === "checkbox") value = checked;
    else if (type === "number") value = rawValue === "" ? "" : Number(rawValue);
    else value = rawValue;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // append fields (converte boolean/number para string)
    Object.keys(formData).forEach((key) => {
      const val = formData[key];
      data.append(key, val === undefined || val === null ? "" : String(val));
    });

    // arquivos
    files.forEach((file) => data.append("listaImagens", file));

    if (onSubmit) {
      onSubmit(data);
    }
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
            name="valor"
            value={formData.valor}
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
              name="estado"
              id="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
              {/* preencha com estados conforme sua fonte */}
            </select>

            <label className="mb-1 mt-3">
              Cidade <span className="text-red-500">*</span>
            </label>
            <select
              name="cidadeId"
              id="cidadeId"
              value={formData.cidadeId}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
            </select>

            <label className="mb-1 mt-3">
              Bairro <span className="text-red-500">*</span>
            </label>
            <select
              name="bairroId"
              id="bairro"
              value={formData.bairroId}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">
              Vila <span className="text-red-500">*</span>
            </label>
            <select
              name="vilaId"
              id="vila"
              value={formData.vilaId}
              onChange={handleChange}
              required
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            >
              <option value="">-- selecione --</option>
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
              type="number"
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
              name="area"
              value={formData.area}
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
              value={formData.quarto}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">Banheiros</label>
            <input
              type="number"
              name="banheiro"
              value={formData.banheiro}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />

            <label className="mb-1 mt-3">Garagem</label>
            <input
              type="number"
              name="garagem"
              value={formData.garagem}
              onChange={handleChange}
              className="border border-gray-400 hover:border-blue-500 rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Suíte</label>
            <input
              type="number"
              name="suite"
              value={formData.suite}
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
          {imovel?.id ? "Atualizar Imóvel" : "Postar Imóvel"}
        </button>
      </div>
    </form>
  );
};