import { sum } from './sum';

describe('Testing sum function', () => {
  it('Should return the sum sucessfuly', () => {
    expect(sum(1, 1)).toBe(2);
    expect(sum(3, 1)).toBe(4);
  });

  it('shoud return a wrong value', () => {
    expect(sum(2, 1)).not.toBe(10);
  });
});
