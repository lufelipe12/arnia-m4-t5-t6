import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import {
  jwtServiceMock,
  loginPayloadMock,
  userRepositoryMock,
} from '../testing';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userRepositoryMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined.', () => {
    expect(authService).toBeDefined();
  });

  it('Should login and generate a token', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    const result = await authService.login(loginPayloadMock);

    expect(result).toHaveProperty('accessToken');
    expect(typeof result.accessToken).toBe('string');
  });
});
