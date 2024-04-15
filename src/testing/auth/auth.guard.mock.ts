import { CanActivate, ExecutionContext } from '@nestjs/common';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['user'] = {
      userId: 1,
    };

    return true;
  }),
};
