import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { userServiceMock } from '../testing/users/user-service.mock';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { token } from '../testing/auth/token.mock';
import { loginDtoMock } from '../testing/auth/login-dto.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userServiceMock, jwtServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('Should return an acess token', async () => {
      jest.spyOn(bcrypt, 'compare').mockReturnValue(true as any);

      const { access_token } = await service.login(loginDtoMock);

      expect(access_token).toEqual(token);
    });
  });
});
