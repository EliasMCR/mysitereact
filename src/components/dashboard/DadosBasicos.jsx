export const DadosBasicos = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-medium text-gray-950 mb-1">
          Nome Imobiliária:
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-950 mb-1">CNPJ:</label>
        <input
          type="text"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-950 mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-950 mb-1">
          Telefone:
        </label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(xx) xxxxx-xxxx"
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-950 mb-1">
          Nova Senha:
        </label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Deixe vazio para não alterar"
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-950 mb-1">
          Confirmar Nova Senha:
        </label>
        <input
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          placeholder="Confirme a nova senha"
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block font-medium text-gray-950 mb-1">
          Mensagem de aviso:
        </label>
        <textarea
          name="mensagemAviso"
          value={formData.mensagemAviso}
          onChange={handleChange}
          placeholder="Mensagem de aviso do seu site"
          className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2 h-20 md:h-32 resize-none"
        />
      </div>
    </div>
  );
};
