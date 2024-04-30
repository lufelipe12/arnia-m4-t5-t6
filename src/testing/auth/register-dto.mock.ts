import { UserRoleEnum } from '../../enums/user-role.enum';
import { RegisterAuthDto } from '../../auth/dto/register-auth.dto';

export const registerUserDtoMock: RegisterAuthDto = {
  email: 'test@test.com',
  name: 'test',
  password: 'testing',
  role: UserRoleEnum.BUYER,
};
