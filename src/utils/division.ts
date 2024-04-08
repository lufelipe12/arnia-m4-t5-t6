export const division = (value1: number, value2: number): number => {
  if (value2 === 0) {
    throw new Error('Denominador inválido');
  }
  return value1 / value2;
};
