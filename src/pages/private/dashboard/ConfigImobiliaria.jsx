// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../../config";

// export const ConfigImobiliaria = () => {
//   const [imobiliaria, setImobiliaria] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [originalData, setOriginalData] = useState({}); // Dados originais para comparação

//   // Estados para endereços
//   const [estados, setEstados] = useState([]);
//   const [cidades, setCidades] = useState([]);
//   const [bairros, setBairros] = useState([]);
//   const [vilas, setVilas] = useState([]);

//   // Estado que controla quais seções estão abertas
//   const [secoesAbertas, setSecoesAbertas] = useState({
//     endereco: false,
//     senha: false,
//     areaAtuacao: false,
//   });

//   // Função para alternar se uma seção está aberta
//   const toggleSecao = (secao) => {
//     setSecoesAbertas((prev) => ({
//       ...prev,
//       [secao]: !prev[secao],
//     }));
//   };

//   const [formData, setFormData] = useState({
//     nome: "",
//     cnpj: "",
//     email: "",
//     telefone: "",
//     senha: "",
//     confirmarSenha: "",
//     mensagemAviso: "",
//     cidadeId: "",
//     bairroId: "",
//     vilaId: "",
//     rua: "",
//     numero: "",
//     cep: "",
//     estadoId: "",
//     plano: "",
//   });

//   // Carregar estados ao montar o componente
//   useEffect(() => {
//     const fetchEstados = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/endereco/estado`);
//         if (res.ok) {
//           const data = await res.json();
//           setEstados(data);
//         }
//       } catch (err) {
//         console.error("Erro ao carregar estados:", err);
//       }
//     };

//     fetchEstados();
//   }, []);

//   // Carregar dados da imobiliária
//   useEffect(() => {
//     const fetchImobiliaria = async () => {
//       const imobiliariaId = localStorage.getItem("imobiliariaId");
//       if (!imobiliariaId) return;

//       try {
//         const res = await fetch(
//           `${BASE_URL}/imobiliaria/info?id=${imobiliariaId}`
//         );
//         if (!res.ok) throw new Error("Erro ao buscar imobiliária");
//         const data = await res.json();
//         setImobiliaria(data);

//         // Dados originais normalizados
//         const normalizedData = {
//           nome: data.nome || "",
//           cnpj: data.cnpj || "",
//           email: data.email || "",
//           telefone: data.telefone || "",
//           senha: "",
//           confirmarSenha: "",
//           mensagemAviso: data.mensagemAviso || "",
//           cidadeId: data.endereco?.cidadeId || "",
//           bairroId: data.endereco?.bairroId || "",
//           vilaId: data.endereco?.vilaId || "",
//           rua: data.endereco?.rua || "",
//           numero: data.endereco?.numero || "",
//           cep: data.endereco?.cep || "",
//           estadoId: data.endereco?.estadoId || "",
//           plano: data.plano || "",
//         };

//         // Salva os dados originais para comparação
//         setOriginalData(normalizedData);
//         // Popula formData com dados do backend
//         setFormData(normalizedData);

//         // Se já tem endereço, carrega as opções relacionadas
//         if (data.endereco?.estadoId) {
//           await loadCidades(data.endereco.estadoId);
//           if (data.endereco?.cidadeId) {
//             await loadBairros(data.endereco.cidadeId);
//             if (data.endereco?.bairroId) {
//               await loadVilas(data.endereco.bairroId);
//             }
//           }
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImobiliaria();
//   }, []);

//   // Funções para carregar endereços relacionados
//   const loadCidades = async (estadoId) => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/endereco/cidade/listaCidades?idEstado=${estadoId}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setCidades(data);
//       }
//     } catch (err) {
//       console.error("Erro ao carregar cidades:", err);
//     }
//   };

//   const loadBairros = async (cidadeId) => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/endereco/bairros?cidadeId=${cidadeId}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setBairros(data);
//       }
//     } catch (err) {
//       console.error("Erro ao carregar bairros:", err);
//     }
//   };

//   const loadVilas = async (bairroId) => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/endereco/vilas?bairroId=${bairroId}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setVilas(data);
//       }
//     } catch (err) {
//       console.error("Erro ao carregar vilas:", err);
//     }
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     // Lógica para carregar dados relacionados
//     if (name === "estadoId") {
//       // Limpa seleções dependentes
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         cidadeId: "",
//         bairroId: "",
//         vilaId: "",
//       }));
//       setCidades([]);
//       setBairros([]);
//       setVilas([]);

//       // Carrega cidades do estado selecionado
//       if (value) {
//         await loadCidades(value);
//       }
//     } else if (name === "cidadeId") {
//       // Limpa seleções dependentes
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         bairroId: "",
//         vilaId: "",
//       }));
//       setBairros([]);
//       setVilas([]);

//       // Carrega bairros da cidade selecionada
//       if (value) {
//         await loadBairros(value);
//       }
//     } else if (name === "bairroId") {
//       // Limpa seleção dependente
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         vilaId: "",
//       }));
//       setVilas([]);

//       // Carrega vilas do bairro selecionado
//       if (value) {
//         await loadVilas(value);
//       }
//     } else {
//       // Para outros campos, apenas atualiza o valor
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Função para identificar apenas os campos alterados
//   const getChangedFields = () => {
//     const changedFields = {};
//     const enderecoFields = [
//       "cidadeId",
//       "bairroId",
//       "vilaId",
//       "rua",
//       "numero",
//       "cep",
//       "estadoId",
//     ];
//     let enderecoChanged = false;

//     Object.keys(formData).forEach((key) => {
//       if (key === "senha" || key === "confirmarSenha") {
//         if (formData[key] !== "") {
//           changedFields[key] = formData[key];
//         }
//       } else if (enderecoFields.includes(key)) {
//         if (formData[key] !== originalData[key]) {
//           if (!changedFields.endereco) changedFields.endereco = {};
//           changedFields.endereco[key] = formData[key];
//           enderecoChanged = true;
//         }
//       } else {
//         if (formData[key] !== originalData[key]) {
//           changedFields[key] = formData[key];
//         }
//       }
//     });

//     return changedFields;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const changedFields = getChangedFields();

//     // Verifica se há campos alterados
//     if (Object.keys(changedFields).length === 0) {
//       console.log("Nenhum campo foi alterado");
//       alert("Nenhuma alteração foi detectada!");
//       return;
//     }

//     // Validação de senhas se foram alteradas
//     if (changedFields.senha || changedFields.confirmarSenha) {
//       if (changedFields.senha !== changedFields.confirmarSenha) {
//         alert("As senhas não coincidem!");
//         return;
//       }
//       // Remove confirmarSenha do envio, deixa apenas senha
//       delete changedFields.confirmarSenha;
//     }

//     console.log("Enviando apenas campos alterados:", changedFields);

//     try {
//       const token = localStorage.getItem("token"); // seu JWT
//       const imobiliariaId = localStorage.getItem("imobiliariaId");
//       const res = await fetch(`${BASE_URL}/imobiliaria/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // envia o JWT
//         },
//         body: JSON.stringify({
//           id: imobiliariaId,
//           ...changedFields,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Erro ao atualizar imobiliária");
//       }

//       // Atualiza os dados originais com os novos valores após sucesso
//       setOriginalData((prev) => ({ ...prev, ...changedFields }));

//       // Limpa os campos de senha após atualização bem-sucedida
//       if (changedFields.senha) {
//         setFormData((prev) => ({ ...prev, senha: "", confirmarSenha: "" }));
//       }

//       alert("Configurações atualizadas com sucesso!");
//     } catch (error) {
//       console.error("Erro ao atualizar:", error);
//       alert("Erro ao atualizar configurações!");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Carregando...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-2">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
//       >
//         <h3 className="text-2xl font-semibold mb-4">Configurações</h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               Nome Imobiliária:
//             </label>
//             <input
//               type="text"
//               name="nome"
//               value={formData.nome}
//               onChange={handleChange}
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               CNPJ:
//             </label>
//             <input
//               type="text"
//               name="cnpj"
//               value={formData.cnpj}
//               onChange={handleChange}
//               placeholder="00.000.000/0000-00"
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               Telefone:
//             </label>
//             <input
//               type="tel"
//               name="telefone"
//               value={formData.telefone}
//               onChange={handleChange}
//               placeholder="(xx) xxxxx-xxxx"
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               Nova Senha:
//             </label>
//             <input
//               type="password"
//               name="senha"
//               value={formData.senha}
//               onChange={handleChange}
//               placeholder="Deixe vazio para não alterar"
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//             />
//           </div>

//           <div>
//             <label className="block font-medium text-gray-950 mb-1">
//               Confirmar Nova Senha:
//             </label>
//             <input
//               type="password"
//               name="confirmarSenha"
//               value={formData.confirmarSenha}
//               onChange={handleChange}
//               placeholder="Confirme a nova senha"
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block font-medium text-gray-950 mb-1">
//               Mensagem de aviso:
//             </label>
//             <textarea
//               name="mensagemAviso"
//               value={formData.mensagemAviso}
//               onChange={handleChange}
//               placeholder="Mensagem de aviso do seu site"
//               className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2 h-20 md:h-32 resize-none"
//             />
//           </div>

//           {/* Endereço */}
//           {/* Botão para mostrar/ocultar endereço */}
//           <div className="md:col-span-2">
//             <button
//               type="button"
//               onClick={() => toggleSecao("endereco")}
//               className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
//             >
//               <span className="font-medium text-gray-900">Endereço</span>
//               <span className="text-gray-600">
//                 {secoesAbertas.endereco ? "▼" : "▶"}
//               </span>
//             </button>
//           </div>

//           {/* Seção de endereço - oculta por padrão */}
//           {secoesAbertas.endereco && (
//             <>
//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Estado:
//                 </label>
//                 <select
//                   name="estadoId"
//                   value={formData.estadoId}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2 text-black"
//                   required
//                 >
//                   <option value="">Selecione um estado</option>
//                   {estados.map((estado) => (
//                     <option key={estado.id} value={estado.id}>
//                       {estado.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Cidade:
//                 </label>
//                 <select
//                   name="cidadeId"
//                   value={formData.cidadeId}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   required
//                   disabled={!formData.estadoId}
//                 >
//                   <option value="">
//                     {formData.estadoId
//                       ? "Selecione a cidade"
//                       : "Selecione um estado primeiro"}
//                   </option>
//                   {cidades.map((cidade) => (
//                     <option key={cidade.id} value={cidade.id}>
//                       {cidade.nome}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Bairro:
//                 </label>
//                 <select
//                   name="bairroId"
//                   value={formData.bairroId}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   required
//                   disabled={!formData.cidadeId}
//                 >
//                   <option value="">
//                     {formData.cidadeId
//                       ? "Selecione o bairro"
//                       : "Selecione uma cidade primeiro"}
//                   </option>
//                   {bairros.map((bairro) => (
//                     <option key={bairro.id} value={bairro.id}>
//                       {bairro.nome}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Vila (opcional):
//                 </label>
//                 <select
//                   name="vilaId"
//                   value={formData.vilaId}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   disabled={!formData.bairroId}
//                 >
//                   <option value="">
//                     {formData.bairroId
//                       ? "Selecione a vila"
//                       : "Selecione um bairro primeiro"}
//                   </option>
//                   {vilas.map((vila) => (
//                     <option key={vila.id} value={vila.id}>
//                       {vila.nome}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Rua:
//                 </label>
//                 <input
//                   type="text"
//                   name="rua"
//                   value={formData.rua}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   Número:
//                 </label>
//                 <input
//                   type="text"
//                   name="numero"
//                   value={formData.numero}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-950 mb-1">
//                   CEP:
//                 </label>
//                 <input
//                   type="text"
//                   name="cep"
//                   value={formData.cep}
//                   onChange={handleChange}
//                   placeholder="00000-000"
//                   className="w-full border border-gray-300 hover:border-blue-500 focus:outline-blue-500 rounded p-2"
//                   required
//                 />
//               </div>
//             </>
//           )}
//           <input type="hidden" name="plano" value={formData.plano} />
//         </div>

//         {/* Botão para mostrar/ocultar adicionar cidades e estados */}
//         <div className="md:col-span-2">
//           <button
//             type="button"
//             onClick={() => toggleSecao("areaAtuacao")}
//             className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors"
//           >
//             <span className="font-medium text-gray-900">Estados e cidades atendidas</span>
//             <span className="text-gray-600">
//               {secoesAbertas.areaAtuacao ? "▼" : "▶"}
//             </span>
//           </button>
//         </div>

//           {secoesAbertas.areaAtuacao && (<>
//           <p>teste</p>
//           </>)}

//         <button
//           type="submit"
//           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Salvar Configurações
//         </button>
//       </form>
//     </div>
//   );
// };
// ConfigImobiliaria.jsx (componente principal refatorado)
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { useImobiliariaData } from "../../../components/hooks/dashboard/useImobiliariaData";
import { useEnderecos } from "../../../components/hooks/dashboard/useEnderecos";
import { DadosBasicos } from "../../../components/dashboard/DadosBasicos";
import { SecaoEndereco } from "../../../components/dashboard/SecaoEndereco";
import { SecaoAreaAtuacao } from "../../../components/dashboard/SecaoAreaAtuacao";
import { getChangedFields } from "../../../components/utils/dashboard/getChangedFields";

export const ConfigImobiliaria = () => {
  const { 
    imobiliaria, 
    loading, 
    originalData, 
    formData, 
    updateFormData, 
    setOriginalData 
  } = useImobiliariaData();
  
  const { 
    estados, 
    cidades, 
    bairros, 
    vilas,
    loadCidades,
    loadBairros,
    loadVilas,
    setCidades,
    setBairros,
    setVilas
  } = useEnderecos();

  const [secoesAbertas, setSecoesAbertas] = useState({
    endereco: false,
    senha: false,
    areaAtuacao: false,
  });

  const toggleSecao = (secao) => {
    setSecoesAbertas((prev) => ({
      ...prev,
      [secao]: !prev[secao],
    }));
  };

  // Carrega endereços relacionados quando os dados da imobiliária são carregados
  useEffect(() => {
    const loadRelatedAddresses = async () => {
      if (imobiliaria?.endereco?.estadoId) {
        await loadCidades(imobiliaria.endereco.estadoId);
        if (imobiliaria.endereco?.cidadeId) {
          await loadBairros(imobiliaria.endereco.cidadeId);
          if (imobiliaria.endereco?.bairroId) {
            await loadVilas(imobiliaria.endereco.bairroId);
          }
        }
      }
    };

    if (imobiliaria) {
      loadRelatedAddresses();
    }
  }, [imobiliaria]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "estadoId") {
      updateFormData({
        [name]: value,
        cidadeId: "",
        bairroId: "",
        vilaId: "",
      });
      setCidades([]);
      setBairros([]);
      setVilas([]);

      if (value) {
        await loadCidades(value);
      }
    } else if (name === "cidadeId") {
      updateFormData({
        [name]: value,
        bairroId: "",
        vilaId: "",
      });
      setBairros([]);
      setVilas([]);

      if (value) {
        await loadBairros(value);
      }
    } else if (name === "bairroId") {
      updateFormData({
        [name]: value,
        vilaId: "",
      });
      setVilas([]);

      if (value) {
        await loadVilas(value);
      }
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = getChangedFields(formData, originalData);

    if (Object.keys(changedFields).length === 0) {
      alert("Nenhuma alteração foi detectada!");
      return;
    }

    if (changedFields.senha || changedFields.confirmarSenha) {
      if (changedFields.senha !== changedFields.confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }
      delete changedFields.confirmarSenha;
    }

    try {
      const token = localStorage.getItem("token");
      const imobiliariaId = localStorage.getItem("imobiliariaId");
      
      const res = await fetch(`${BASE_URL}/imobiliaria/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: imobiliariaId,
          ...changedFields,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar imobiliária");
      }

      setOriginalData((prev) => ({ ...prev, ...changedFields }));

      if (changedFields.senha) {
        updateFormData({ senha: "", confirmarSenha: "" });
      }

      alert("Configurações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar configurações!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h3 className="text-2xl font-semibold mb-4">Configurações</h3>

        <DadosBasicos formData={formData} handleChange={handleChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SecaoEndereco
            formData={formData}
            handleChange={handleChange}
            estados={estados}
            cidades={cidades}
            bairros={bairros}
            vilas={vilas}
            isOpen={secoesAbertas.endereco}
            onToggle={() => toggleSecao("endereco")}
          />

          <SecaoAreaAtuacao
            isOpen={secoesAbertas.areaAtuacao}
            onToggle={() => toggleSecao("areaAtuacao")}
          />
        </div>

        <input type="hidden" name="plano" value={formData.plano} />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};
