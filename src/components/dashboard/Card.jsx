import { Link } from "react-router-dom";
import imagemPadrao from "../../assets/imagemPadrao.png";

// devolve uma lista de cards
export const Card = ({ imoveis }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {imoveis.map((imovel, index) => {
        const imagem =
          imovel.imagensImovel?.[0]?.replace(/^http:\/\//, "https://") ||
          imagemPadrao;

        const endereco = imovel.endereco || {};

        return (
          <div
            key={`${imovel.id}-${index}`}
            className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden text-blue-500"
          >
            {/* Header do card */}
            <div className="flex justify-between items-center p-2">
              <p className="text-sm font-semibold">Cód:{imovel.id}</p>
              <div className="flex gap-2">
                <Link
                  to={`/dashboard/editar/${imovel.id}`}
                  state={{ imovel }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <span className="material-symbols-outlined text-gray-600 hover:text-blue-500">
                    edit
                  </span>
                </Link>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <span className="material-symbols-outlined text-red-600 hover:text-blue-500">
                    delete
                  </span>
                </button>
              </div>
            </div>

            {/* Imagem */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={imagem}
                alt={imovel.titulo || "Imagem do imóvel"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rodapé */}
            <div className="p-2">
              <p className="text-gray-700 text-sm">
                Rua {endereco.rua || "-"} {endereco.numero || "-"},{" "}
                {endereco.bairro || "-"}, {endereco.cidade || "-"}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
