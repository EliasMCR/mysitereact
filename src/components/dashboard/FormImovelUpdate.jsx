import { useState, useEffect, useMemo } from "react";
import { useEnderecos } from "../hooks/dashboard/useEnderecos";

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
      // Campos básicos
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

      // Endereço
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

  // Imagens existentes e remoções
  const [existingImages, setExistingImages] = useState(imovel.imagens || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Sincroniza valores iniciais se o imovel mudar
  useEffect(() => {
    setFormData(initialFormData);
    setExistingImages(imovel.imagens || []);
    setRemovedImages([]);
    setNewFiles([]);
    setPreviews([]);
  }, [imovel, initialFormData]);

  // Previews para novos arquivos
  useEffect(() => {
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFiles]);

  // Carrega cidades/bairros/vilas conforme selects
  useEffect(() => {
    if (formData.estadoId) loadCidades(formData.estadoId);
  }, [formData.estadoId]);
  useEffect(() => {
    if (formData.cidadeId) loadBairros(formData.cidadeId);
  }, [formData.cidadeId]);
  useEffect(() => {
    if (formData.bairroId) loadVilas(formData.bairroId);
  }, [formData.bairroId]);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : type === "number" ? (value === "" ? null : Number(value)) : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (name === "estadoId") {
      setFormData((prev) => ({ ...prev, cidadeId: null, bairroId: null, vilaId: null }));
      if (val) await loadCidades(val);
    } else if (name === "cidadeId") {
      setFormData((prev) => ({ ...prev, bairroId: null, vilaId: null }));
      if (val) await loadBairros(val);
    } else if (name === "bairroId") {
      setFormData((prev) => ({ ...prev, vilaId: null }));
      if (val) await loadVilas(val);
    }
  };

  const handleNewFiles = (e) => setNewFiles([...e.target.files]);

  const handleRemoveExisting = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Monta payload apenas com alterações
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialFormData[key]) changedFields[key] = formData[key];
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
      {/* Tipo transação e imóvel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Tipo Transação</label>
          <select name="tipoTransacao" value={formData.tipoTransacao} onChange={handleChange}>
            <option value="ALUGUEL">Aluguel</option>
            <option value="VENDA">Venda</option>
          </select>
        </div>
        <div>
          <label>Tipo Imóvel</label>
          <select name="tipoImovel" value={formData.tipoImovel} onChange={handleChange}>
            <option value="CASA">CASA</option>
            <option value="APARTAMENTO">APARTAMENTO</option>
            <option value="SOBRADO">SOBRADO</option>
            <option value="KITNET">KITNET</option>
            <option value="CHACARA">CHÁCARA</option>
            <option value="SITIO">SÍTIO</option>
            <option value="FAZENDA">FAZENDA</option>
            <option value="TERRENO">TERRENO</option>
          </select>
        </div>
      </div>

      {/* Valor e título */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Valor</label>
          <input type="number" step="0.01" name="valor" value={formData.valor || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Título</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
      </div>

      {/* Endereço */}
      <div>
        <p className="font-semibold">Endereço</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Estado</label>
            <select name="estadoId" value={formData.estadoId || ""} onChange={handleChange}>
              <option value="">-- selecione --</option>
              {(estadosLocalStorage.length ? estadosLocalStorage : estados).map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>

            <label>Cidade</label>
            <select name="cidadeId" value={formData.cidadeId || ""} onChange={handleChange}>
              <option value="">-- selecione --</option>
              {cidades.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>

            <label>Bairro</label>
            <select name="bairroId" value={formData.bairroId || ""} onChange={handleChange}>
              <option value="">-- selecione --</option>
              {bairros.map((b) => <option key={b.id} value={b.id}>{b.nome}</option>)}
            </select>
          </div>

          <div>
            <label>Vila</label>
            <select name="vilaId" value={formData.vilaId || ""} onChange={handleChange}>
              <option value="">-- selecione --</option>
              {vilas.map((v) => <option key={v.id} value={v.id}>{v.nome}</option>)}
            </select>

            <label>Rua</label>
            <input type="text" name="rua" value={formData.rua} onChange={handleChange} />

            <label>Número</label>
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
          </div>

          <div>
            <label>CEP</label>
            <input type="text" name="cep" value={formData.cep} onChange={handleChange} />

            <label>Área (m²)</label>
            <input type="number" step="0.01" name="area" value={formData.area || ""} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Características */}
      <div>
        <p className="font-semibold">Características</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Quartos</label>
            <input type="number" name="quarto" value={formData.quarto || ""} onChange={handleChange} />

            <label>Banheiros</label>
            <input type="number" name="banheiro" value={formData.banheiro || ""} onChange={handleChange} />

            <label>Garagem</label>
            <input type="number" name="garagem" value={formData.garagem || ""} onChange={handleChange} />
          </div>

          <div>
            <label>Suíte</label>
            <input type="number" name="suite" value={formData.suite || ""} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label>
              <input type="checkbox" name="disponivel" checked={!!formData.disponivel} onChange={handleChange} /> Disponível
            </label>
            <label>
              <input type="checkbox" name="imovelDestaque" checked={!!formData.imovelDestaque} onChange={handleChange} /> Destaque
            </label>
            <label>
              <input type="checkbox" name="churrasqueira" checked={!!formData.churrasqueira} onChange={handleChange} /> Churrasqueira
            </label>
            <label>
              <input type="checkbox" name="lavanderia" checked={!!formData.lavanderia} onChange={handleChange} /> Lavanderia
            </label>
            <label>
              <input type="checkbox" name="aceitaPet" checked={!!formData.aceitaPet} onChange={handleChange} /> Aceita Pet
            </label>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label>Descrição</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange}></textarea>
      </div>

      {/* Upload de imagens */}
      <div>
        <p>Imagens existentes</p>
        <div className="flex gap-2 flex-wrap">
          {existingImages.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} alt={`img-${i}`} className="w-24 h-24 object-cover rounded" />
              <button type="button" onClick={() => handleRemoveExisting(img)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
            </div>
          ))}
        </div>

        <label>Novas imagens</label>
        <input type="file" accept="image/*" multiple onChange={handleNewFiles} />
        <div className="flex gap-2 flex-wrap mt-2">
          {previews.map((src, i) => <img key={i} src={src} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded" />)}
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Atualizar Imóvel
      </button>
    </form>
  );
};
