import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getUserByContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    const user = context.switchToHttp().getRequest().user;

    return user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getUserByContext(context),
);
