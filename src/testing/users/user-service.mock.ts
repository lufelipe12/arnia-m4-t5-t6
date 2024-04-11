import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn().mockResolvedValue(userMock),
  },
};
