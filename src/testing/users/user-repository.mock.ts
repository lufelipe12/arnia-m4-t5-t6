import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../database/entites';
import { userMock } from './user.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockResolvedValue(userMock),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(userMock),
  },
};
