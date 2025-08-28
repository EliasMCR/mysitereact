// utils/formUtils.js
export const getChangedFields = (formData, originalData) => {
  const changedFields = {};
  const enderecoFields = [
    "cidadeId",
    "bairroId",
    "vilaId",
    "rua",
    "numero",
    "cep",
    "estadoId",
  ];

  Object.keys(formData).forEach((key) => {
    if (key === "senha" || key === "confirmarSenha") {
      if (formData[key] !== "") {
        changedFields[key] = formData[key];
      }
    } else if (enderecoFields.includes(key)) {
      if (formData[key] !== originalData[key]) {
        if (!changedFields.endereco) changedFields.endereco = {};
        changedFields.endereco[key] = formData[key];
      }
    } else {
      if (formData[key] !== originalData[key]) {
        changedFields[key] = formData[key];
      }
    }
  });

  return changedFields;
};
