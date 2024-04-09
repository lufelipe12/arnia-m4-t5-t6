import { convertIsoDateToDate } from './date-format';

describe('Testing date format', () => {
  it('Should return a Date DD/MM/YYYY when receives a isoString', () => {
    // arrange
    const isoDateString = '2024-04-08T14:25:23.123Z';
    const expectedDate = '08/04/2024';

    // act
    const convertedDate = convertIsoDateToDate(isoDateString);

    // assert
    expect(convertedDate).toBe(expectedDate);
  });

  it('Should return a Error when add a no Date format', () => {
    // arrange
    const isoDateString = '2024-04-XXADT14:25:23.123Z';

    // act
    const func = () => {
      convertIsoDateToDate(isoDateString);
    };

    // assert
    expect(func).toThrow('Invalid date');
  });
});
