import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { userMock } from './user.mock';
import { usersMock } from './users.mock';
import { updatedMock } from '../updated.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(usersMock),
    findOne: jest.fn(),
    findOneBy: jest.fn().mockResolvedValue(userMock),
    findOneOrFail: jest.fn(),
    update: jest.fn().mockResolvedValue(updatedMock),
  },
};
