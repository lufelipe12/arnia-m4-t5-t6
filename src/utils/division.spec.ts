import { division } from './division';

describe('Testing the division operation', () => {
  it('Should return a devided number sucessfully', () => {
    // arrange
    const num1 = 10;
    const num2 = 2;

    // act
    const result = division(num1, num2);

    // assert
    expect(result).toBe(5);
  });

  it('Should return a Error if the second value is zero', () => {
    expect(() => {
      division(10, 0);
    }).toThrow('Denominador inválido');
  });
});
