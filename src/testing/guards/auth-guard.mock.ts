import { ExecutionContext } from '@nestjs/common';
import { authGuardUserMock } from './auth-guard-user.mock';

export const authGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['user'] = authGuardUserMock;

    return true;
  }),
};
