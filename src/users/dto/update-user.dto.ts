import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { UserRoleEnum } from 'src/enums/user-role.enum';

export class UpdateUserDto extends PartialType(
  OmitType(LoginAuthDto, ['password']),
) {
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
