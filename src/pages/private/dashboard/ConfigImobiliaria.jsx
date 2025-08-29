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
