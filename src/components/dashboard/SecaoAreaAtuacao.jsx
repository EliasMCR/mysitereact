export const SecaoAreaAtuacao = ({ isOpen, onToggle }) => {
  return (
    <>
      <div className="md:col-span-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
        >
          <span className="font-medium text-gray-900">
            Estados e cidades atendidas
          </span>
          <span className="text-gray-600">{isOpen ? "▼" : "▶"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:col-span-2">
          <p>teste</p>
        </div>
      )}
    </>
  );
};
