export const isValidCpf = (value) => {
  // remove caracteres especiais e letras
  const cpf = value.replace(/[^\d]+/g, '');

  // verifica se contem a quantidade correta de caracteres
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica CPF inválidos com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let rest = sum % 11;
  const firstDigit = rest < 2 ? 0 : 11 - rest;

  // Verifica se o primeiro dígito verificador está correto
  if (parseInt(cpf.charAt(9), 10) !== firstDigit) {
    return false;
  }

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  rest = sum % 11;
  const secondDigit = rest < 2 ? 0 : 11 - rest;

  // Verifica se o segundo dígito verificador está correto
  return parseInt(cpf.charAt(10), 10) === secondDigit;
};
