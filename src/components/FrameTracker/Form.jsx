import { useState } from "react";

export const Form = () => {
  const [marca, setMarca] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", { nome, opcao });
    // Aqui você pode enviar os dados para o backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[400px] bg-white flex flex-col m-4 p-4 rounded-3xl gap-5 shadow-2xl
      md:w-[400px]
      "
    >
      <label htmlFor="Marca">Escolha uma marca de armação:</label>
      <select
        name="marca"
        id="marca"
        className="bg-[var(--imob-color-five)] p-1 rounded-2xl"
      ></select>
      <label htmlFor="codigoArmacao">Código da armação:</label>
      <input
        type="text"
        name="codigoArmacao"
        id="codigoArmacao"
        placeholder="ex: FH340"
        className="bg-[var(--imob-color-five)] p-1 rounded-2xl"
      />
      <button
        type="submit"
        className="bg-[var(--imob-color-one)] rounded-2xl text-white h-10 cursor-pointer hover:bg-[var(--imob-color-one)]/90"
      >
        Pesquisar
      </button>
    </form>
  );
};
