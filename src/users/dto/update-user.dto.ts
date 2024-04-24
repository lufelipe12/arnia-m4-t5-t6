import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { UserRoleEnum } from 'src/enums/user-role.enum';

export class UpdateUserDto extends PartialType(LoginAuthDto) {
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
