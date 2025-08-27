import { useState, useEffect } from "react";

export const FormImovel = ({ imovel = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    tipoTransacao: imovel.tipoTransacao || "ALUGUEL",
    tipoImovel: imovel.tipoImovel || "",
    valor: imovel.valor || "",
    titulo: imovel.titulo || "",
    estado: imovel.estado || "",
    cidadeId: imovel.cidadeId || "",
    bairroId: imovel.bairroId || "",
    vilaId: imovel.vilaId || "",
    rua: imovel.rua || "",
    numero: imovel.numero || "",
    cep: imovel.cep || "",
    quarto: imovel.quarto || 0,
    banheiro: imovel.banheiro || 0,
    garagem: imovel.garagem || 0,
    suite: imovel.suite || 0,
    area: imovel.area || "",
    disponivel: imovel.disponivel ?? true,
    imovelDestaque: imovel.imovelDestaque ?? false,
    churrasqueira: imovel.churrasqueira ?? false,
    lavanderia: imovel.lavanderia ?? false,
    aceitaPet: imovel.aceitaPet ?? false,
    descricao: imovel.descricao || "",
  });

  const [files, setFiles] = useState([]);

  // Atualiza estado quando o usuário digita / seleciona algo
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    // Adiciona os campos normais
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // Adiciona os arquivos
    files.forEach((file) => data.append("listaImagens", file));

    if (onSubmit) {
      onSubmit(data); // callback para o pai (POST ou PUT)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 max-w-2xl mx-auto"
    >
      {/* Tipo Transação */}
      <section className="space-y-2">
        <p className="font-semibold text-lg">Escolha o tipo de transação:</p>

        <label className="font-medium">
          Tipo Transação: <span className="text-red-500">*</span>
        </label>
        <select
          name="tipoTransacao"
          value={formData.tipoTransacao}
          onChange={handleChange}
          required
          className="border rounded p-2"
        >
          <option value="ALUGUEL">ALUGUEL</option>
          <option value="VENDA">VENDA</option>
        </select>

        <label className="font-medium">
          Tipo imóvel: <span className="text-red-500">*</span>
        </label>
        <select
          name="tipoImovel"
          value={formData.tipoImovel}
          onChange={handleChange}
          required
          className="border rounded p-2"
        >
          <option value="">-- Selecione --</option>
          <option value="CASA">Casa</option>
          <option value="APARTAMENTO">Apartamento</option>
        </select>

        <label className="font-medium">Valor do imóvel:</label>
        <input
          type="number"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          placeholder="R$0,00"
          required
          className="border rounded p-2"
        />

        <label className="font-medium">Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </section>

      <hr />

      {/* Exemplo Upload */}
      <section className="space-y-2">
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
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <span
                key={index}
                className="text-xs border p-1 rounded bg-gray-100"
              >
                {file.name}
              </span>
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
          {imovel.id ? "Atualizar Imóvel" : "Postar Imóvel"}
        </button>
      </div>
    </form>
  );
};
