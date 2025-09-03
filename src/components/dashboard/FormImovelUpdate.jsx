import { useState, useEffect, useMemo } from "react";
import { useEnderecos } from "../hooks/dashboard/useEnderecos";
import { Spinner } from "../../components/ui/Spinner";

export const FormImovelUpdate = ({ imovel = {}, onSubmit }) => {
  const imobiliaria = JSON.parse(localStorage.getItem("imobiliariaData")) || [];
  const estadosLocalStorage = imobiliaria.estado || [];

  

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
      imovelId: imovel.imovelId || null,
      area: imovel.area ?? 99.0,
      titulo: imovel.titulo || "",
      valor: imovel.valor ?? 0,
      banheiro: imovel.banheiro ?? 1,
      quarto: imovel.quarto ?? 1,
      suite: imovel.suite ?? 0,
      garagem: imovel.garagem ?? 0,
      lavanderia: imovel.lavanderia ?? false,
      churrasqueira: imovel.churrasqueira ?? false,
      disponivel: imovel.disponivel ?? true,
      aceitaPet: imovel.aceitaPet ?? true,
      tipoImovel: imovel.tipoImovel || "CASA",
      tipoTransacao: imovel.tipoTransacao || "ALUGUEL",
      imovelDestaque: imovel.imovelDestaque ?? false,
      descricao: imovel.descricao || "",
      rua: imovel.rua || imovel.endereco?.rua || "",
      numero: imovel.numero || imovel.endereco?.numero || "",
      bairroId: imovel.bairroId || imovel.endereco?.bairroId || null,
      vilaId: imovel.vilaId || imovel.endereco?.vilaId || null,
      cidadeId: imovel.cidadeId || imovel.endereco?.cidadeId || null,
      estadoId: imovel.estadoId || imovel.endereco?.estadoId || null,
      cep: imovel.cep || imovel.endereco?.cep || "",
    }),
    [imovel]
  );

  const [formData, setFormData] = useState(initialFormData);
  const [existingImages, setExistingImages] = useState(
    imovel.imagensImovel || []
  );
  const [removedImages, setRemovedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setFormData(initialFormData);
    setExistingImages(imovel.imagensImovel || []);
    setRemovedImages([]);
    setNewFiles([]);
    setPreviews([]);
  }, [imovel, initialFormData]);

  useEffect(() => {
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFiles]);

  useEffect(() => {
    if (formData.estadoId) loadCidades(formData.estadoId);
  }, [formData.estadoId, loadCidades]);
  useEffect(() => {
    if (formData.cidadeId) loadBairros(formData.cidadeId);
  }, [formData.cidadeId, loadBairros]);
  useEffect(() => {
    if (formData.bairroId) loadVilas(formData.bairroId);
  }, [formData.bairroId, loadVilas]);

  const getInputClass = (fieldName) => {
    const baseClasses =
      "border hover:border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200 w-full";
    const value = formData[fieldName];
    const isValid = value !== null && value !== undefined && value !== "";
    return `${baseClasses} ${isValid ? "border-green-500" : "border-gray-400"}`;
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let val =
      type === "checkbox"
        ? checked
        : type === "number"
        ? value === ""
          ? null
          : Number(value)
        : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

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

  const handleNewFiles = (e) =>
    setNewFiles((prev) => [...prev, ...e.target.files]);
  const handleRemoveExisting = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };
  const removeNewImage = (index) =>
    setNewFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialFormData[key])
        changedFields[key] = formData[key];
    });
    onSubmit({
      ...changedFields,
      removedImages,
      newFiles,
      imovelId: imovel.imovelId,
    });
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
              {(estadosLocalStorage?.length > 0
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
              {cidades.map((c) => (
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
              />{" "}
              Imóvel Disponível
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="imovelDestaque"
                checked={!!formData.imovelDestaque}
                onChange={handleChange}
                className="h-4 w-4"
              />{" "}
              Destaque
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="churrasqueira"
                checked={!!formData.churrasqueira}
                onChange={handleChange}
                className="h-4 w-4"
              />{" "}
              Churrasqueira
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="lavanderia"
                checked={!!formData.lavanderia}
                onChange={handleChange}
                className="h-4 w-4"
              />{" "}
              Lavanderia
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="aceitaPet"
                checked={!!formData.aceitaPet}
                onChange={handleChange}
                className="h-4 w-4"
              />{" "}
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

      {/* Imagens */}
      <section>
        {existingImages.length > 0 && (
          <div className="mb-6">
            <p className="font-semibold mb-3">Imagens Atuais do Imóvel</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {existingImages.map((imageUrl, i) => (
                <div key={i} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`imagem-imovel-${i}`}
                    className="w-full h-24 object-cover rounded border border-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExisting(imageUrl)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Remover imagem"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            {removedImages.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {removedImages.length} imagem(ns) será(ão) removida(s) ao salvar
              </p>
            )}
          </div>
        )}

        <div>
          <p className="font-semibold mb-3">Adicionar Novas Imagens</p>
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl text-gray-400">
              photo_camera
            </span>
            <span className="mt-2 text-sm text-gray-600">
              Selecione as novas imagens do imóvel
            </span>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewFiles}
            className="hidden"
          />

          {previews.length > 0 && (
            <div className="mt-3">
              <p className="font-medium mb-2 text-sm">
                Novas imagens a serem adicionadas:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`nova-imagem-${i}`}
                      className="w-full h-24 object-cover rounded border border-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remover nova imagem"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Botão */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Atualizar Imóvel
        </button>
      </div>
    </form>
  );
};
