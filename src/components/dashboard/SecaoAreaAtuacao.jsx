export const SecaoAreaAtuacao = ({
  isOpen,
  onToggle,
  cidadeLocal = [],
  onDeleteCidade,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
        >
          <span className="font-medium text-gray-900">Cidades atendidas</span>
          <span className="text-gray-600">{isOpen ? "▼" : "▶"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:col-span-2 mt-2">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                    Cidade
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-center text-gray-700 font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {cidadeLocal.map((cidade, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{cidade.nome}</td>
                    <td className="px-4 py-2">
                      {cidade.estado} ({cidade.siglaEstado})
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => onDeleteCidade(cidade.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
                {cidadeLocal.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      Nenhuma cidade cadastrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
