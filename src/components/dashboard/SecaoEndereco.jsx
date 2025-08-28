export const SecaoEndereco = ({
  formData,
  handleChange,
  estados,
  cidades,
  bairros,
  vilas,
  isOpen,
  onToggle,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
        >
          <span className="font-medium text-gray-900">Endereço</span>
          <span className="text-gray-600">{isOpen ? "▼" : "▶"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-950 mb-1">
              Estado:
            </label>
            <select
              name="estadoId"
              value={formData.estadoId}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2 text-black"
              required
            >
              <option value="">Selecione um estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">
              Cidade:
            </label>
            <select
              name="cidadeId"
              value={formData.cidadeId}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              required
              disabled={!formData.estadoId}
            >
              <option value="">
                {formData.estadoId
                  ? "Selecione a cidade"
                  : "Selecione um estado primeiro"}
              </option>
              {cidades.map((cidade) => (
                <option key={cidade.id} value={cidade.id}>
                  {cidade.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">
              Bairro:
            </label>
            <select
              name="bairroId"
              value={formData.bairroId}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              required
              disabled={!formData.cidadeId}
            >
              <option value="">
                {formData.cidadeId
                  ? "Selecione o bairro"
                  : "Selecione uma cidade primeiro"}
              </option>
              {bairros.map((bairro) => (
                <option key={bairro.id} value={bairro.id}>
                  {bairro.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">
              Vila (opcional):
            </label>
            <select
              name="vilaId"
              value={formData.vilaId}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              disabled={!formData.bairroId}
            >
              <option value="">
                {formData.bairroId
                  ? "Selecione a vila"
                  : "Selecione um bairro primeiro"}
              </option>
              {vilas.map((vila) => (
                <option key={vila.id} value={vila.id}>
                  {vila.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">Rua:</label>
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">
              Número:
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-950 mb-1">CEP:</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
              required
            />
          </div>
        </div>
      )}
    </>
  );
};
