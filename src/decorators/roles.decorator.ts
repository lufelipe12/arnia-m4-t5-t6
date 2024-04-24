import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'src/enums/user-role.enum';

export const Roles = Reflector.createDecorator<UserRoleEnum[]>();
