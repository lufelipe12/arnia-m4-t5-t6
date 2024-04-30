import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { userServiceMock } from '../testing/users/user-service.mock';
import { userMock } from '../testing/users/user.mock';
import { registerUserDtoMock } from '../testing/auth/register-dto.mock';
import { loginDtoMock } from '../testing/auth/login-dto.mock';
import { tokenMock } from '../testing/auth/token.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, jwtServiceMock, userServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return a registered user', async () => {
      //arrange

      // act
      const user = await service.register(registerUserDtoMock);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('login', () => {
    it('Should return an auth token.', async () => {
      //arrange
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      // act
      const authToken = await service.login(loginDtoMock);

      // assert
      expect(authToken).toHaveProperty('access_token');
      expect(typeof authToken.access_token).toBe('string');
      expect(authToken.access_token).toEqual(tokenMock);
    });
  });
});
