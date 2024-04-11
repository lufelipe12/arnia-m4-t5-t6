import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(userMock),
    isEmailExists: jest.fn(),
    profile: jest.fn().mockResolvedValue(userMock),
  },
};
