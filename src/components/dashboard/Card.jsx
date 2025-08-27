// devolve uma lista de cards
export const Card = ({ imoveis }) => {
  return (
    <section>
      {imoveis.map((imovel) => (
        <div key={imovel.id} className="flex flex-col">
          <div className="flex justify-between">
            <div>
              <p>Cód:{imovel.id}</p>
            </div>
            <div>
              <button>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          <div className="bg-cover w-full h-40">
            <img src={imovel.imagensImovel[0].replace(/^https:\/\//, "http://")} alt={imovel.titulo} />
          </div>
          <div>
            <p>teste</p>
          </div>
        </div>
      ))}
    </section>
  );
};
