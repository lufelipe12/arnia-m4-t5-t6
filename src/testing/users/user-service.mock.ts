import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';
import { usersMock } from './users.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn().mockResolvedValue(userMock),
    create: jest.fn().mockResolvedValue(userMock),
    findAll: jest.fn().mockResolvedValue(usersMock),
    profile: jest.fn().mockResolvedValue(userMock),
    findOne: jest.fn().mockResolvedValue(userMock),
    update: jest.fn().mockResolvedValue(userMock),
    softDelete: jest.fn(),
  },
};
