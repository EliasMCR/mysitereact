export const SectionTwo = () => {
  return (
    <section className="flex flex-col md:flex-col" id="especialidades">
      <h2 className="md:text-5xl text-white flex justify-center items-center pb-5">
        MINHAS <span className="text-[var(--primary-color)]">ESPECIALIDADES</span>
      </h2>

      <div className="flex gap-4 p-4">
        {/* Website */}
        <article className="bg-transparent text-white flex flex-col rounded-3xl p-3
             border-2 border-transparent
             hover:border-transparent
             hover:shadow-[0_0_20px_rgba(79,70,229,0.7)]
             transition-shadow duration-300">
          <div className="text-[var(--primary-color)]">
            <span className="material-symbols-outlined" style={{ fontSize: "6.25rem" }}>code</span>
          </div>
          <h3 className="text-xl font-semibold">Website</h3>
          <p>
            Transforme suas ideias em aplicações poderosas com um back-end
            robusto em Spring Boot. Crio sistemas ágeis, seguros e escaláveis,
            sempre integrando com front-ends modernos para uma experiência
            completa. Conte comigo para desenvolver, otimizar e entregar a
            solução ideal para seu projeto. Vamos construir juntos o futuro
            digital da sua empresa!
          </p>
        </article>

        {/* Banco de dados */}
        <article className="bg-transparent text-white flex flex-col rounded-3xl p-3
             border-2 border-transparent
             hover:border-transparent
             hover:shadow-[0_0_20px_rgba(79,70,229,0.7)]
             transition-shadow duration-300">
          <div className="text-[var(--primary-color)]">
            <span className="material-symbols-outlined" style={{ fontSize: "6.25rem" }}>database</span>
          </div>
          <h3 className="text-xl font-semibold">Banco de dados</h3>
          <p>
            Com expertise em MySQL e NoSQL, crio sistemas que gerenciam seus
            dados de forma eficiente e escalável. Se você precisa de uma
            estrutura relacional robusta ou de soluções flexíveis e rápidas para
            grandes volumes de dados, estou preparado para entregar o que há de
            melhor. Garanto integração perfeita entre back-end e banco de dados,
            otimizando performance e segurança para o seu projeto.
          </p>
        </article>

        {/* Criptografia */}
        <article className="bg-transparent text-white flex flex-col rounded-3xl p-3
             border-2 border-transparent
             hover:border-transparent
             hover:shadow-[0_0_20px_rgba(79,70,229,0.7)]
             transition-shadow duration-300">
          <div className="text-[var(--primary-color)]">
            <span className="material-symbols-outlined" style={{ fontSize: "6.25rem" }}>key</span>
          </div>
          <h3 className="text-xl font-semibold">Criptografia</h3>
          <p>
            Desenvolvo aplicações que priorizam a proteção dos dados. Uso
            criptografia no front e no back-end, autenticação segura com JWT e
            comunicação protegida por SSL/TLS. Assim, garanto conexões seguras,
            acessos controlados e total confidencialidade das informações.
          </p>
        </article>
      </div>
    </section>
  );
};
