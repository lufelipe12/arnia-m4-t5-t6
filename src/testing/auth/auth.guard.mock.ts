import { CanActivate } from '@nestjs/common';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn(),
};
