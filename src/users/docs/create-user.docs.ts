import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDocs {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'teste@123$$',
  })
  password: string;
}
