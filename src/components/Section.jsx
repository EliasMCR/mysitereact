

export const Section = () => {
  return (
    <section id="inicio" className="flex flex-col md:flex-row text-white p-4">
      <div>
        <h1 className="md:text-5xl mb-5">Construindo soluções digitais</h1>
        <p>
          Meu trabalho é criar soluções que seguem os melhores padrões do
          mercado.{" "}
          <span className="text-[var(--primary-color)]">Isso significa</span>:
        </p>

        <ul className="space-y-2 mt-4">
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Princípios SOLID:</span>{" "}
              Código organizado e fácil de manter.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Criptografia Segura:</span>{" "}
              Proteção de dados sensíveis com tecnologias modernas.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Testes Automatizados:</span>{" "}
              Garantia de qualidade e menos erros.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Performance Otimizada:</span>{" "}
              Soluções rápidas e eficientes.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Segurança Prioritária:</span>{" "}
              Prevenção contra vulnerabilidades comuns.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary-color)]">
              arrow_forward
            </span>
            <span>
              <span className="text-[var(--primary-color)]">Documentação Clara:</span>{" "}
              Facilita futuras melhorias.
            </span>
          </li>
        </ul>

        <button className="bg-[var(--primary-color)] rounded-2xl text-black h-10 w-40 mt-6">
          <a href="#contato">Entre em contato</a>
        </button>
      </div>

      <div className="md:ml-10 mt-6 md:mt-0">
        <p>img</p>
      </div>
    </section>
  );
};
