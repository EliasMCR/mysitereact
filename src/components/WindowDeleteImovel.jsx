import { useDeleteImovel } from "./hooks/dashboard/useDeleteImovel";

export const WindowDeleteImovel = ({ imovelId, onClose }) => {
  const { deleteImovel, loading, error, success } = useDeleteImovel();

  const handleDelete = async () => {
    try {
      await deleteImovel(imovelId);
      alert("Imóvel apagado com sucesso!");
      onClose(); // fecha modal
      window.location.reload(); // recarrega página para atualizar lista
    } catch (err) {
      console.error("Erro ao apagar:", err.message);
    }
  };

  return (
    <section className="fixed inset-0 flex z-[9999] items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-2xl p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Confirmar exclusão</h2>
        <p className="mb-6 text-gray-700">
          Tem certeza que deseja excluir o imóvel <strong>{imovelId}</strong>?
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3">Erro: {error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Excluindo..." : "Apagar"}
          </button>
        </div>
      </div>
    </section>
  );
};
