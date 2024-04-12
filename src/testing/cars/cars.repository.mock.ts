import { getRepositoryToken } from '@nestjs/typeorm';

import { Cars } from '../../database/entites';
import { carMock } from './car.mock';

export const carsRepositoryMock = {
  provide: getRepositoryToken(Cars),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn().mockResolvedValue(carMock),
    update: jest.fn(),
    softDelete: jest.fn(),
  },
};
