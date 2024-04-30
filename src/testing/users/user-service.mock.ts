import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(userMock),
    getUserByEmail: jest.fn().mockResolvedValue(userMock),
  },
};
