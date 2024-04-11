import { JwtService } from '@nestjs/jwt';
import { token } from './token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(token),
  },
};
