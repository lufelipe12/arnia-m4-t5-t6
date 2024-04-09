import { isValidCpf } from './validation-cpf';

describe('Testes para a função validarCPF', () => {
  it('Deve retornar verdadeiro para um CPF válido', () => {
    // arrange
    const cpf = '247.002.360-27';

    // act
    const result = isValidCpf(cpf);

    // CPFs válidos e inválidos para teste
    expect(result).toBe(true);
  });

  it('Deve retornar falso para um CPF inválido', () => {
    // arrange
    const cpf = '247.002.360-99';

    // act
    const result = isValidCpf(cpf);

    // CPFs válidos e inválidos para teste
    expect(result).toBe(false);
  });
});
