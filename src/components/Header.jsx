import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between p-20">
      <div>logo</div>
      <nav className="text-[var(--primary-bg-color)]">
        <ul className="flex lg:gap-10">
          <li
            className="
            cursor-pointer hover:text-white border-b-1 border-transparent hover:border-[var(--primary-color)]
            transition-all duration-300
            "
          >
            <a href="#inicio"></a>Início
          </li>
          <li
            className="
            cursor-pointer hover:text-white border-b-1 border-transparent hover:border-[var(--primary-color)]
            transition-all duration-300
            "
          >
            <a href="#especialidades"></a>Especialidades
          </li>
          <li
            className="
            cursor-pointer hover:text-white border-b-1 border-transparent hover:border-[var(--primary-color)]
            transition-all duration-300
            "
          >
            <a href=""></a>Projetos
          </li>
          <li
            className="
            cursor-pointer hover:text-white border-b-1 border-transparent hover:border-[var(--primary-color)]
            transition-all duration-300
            "
          >
            <a href=""></a>Sobre
          </li>
        </ul>
      </nav>
      <button
        className="bg-[var(--primary-color)] rounded-3xl h-8 w-30 
        hover:bg-[var(--secondary-color)] hover:text-white
        "
      >
        <a href="#contato">Contato</a>
      </button>
    </header>
  );
};
