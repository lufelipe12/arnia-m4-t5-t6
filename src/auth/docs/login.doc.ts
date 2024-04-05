import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    title: 'Email',
    description: 'Email to an user login.',
    example: 'lf-test@gmail.com',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password to an user login.',
    example: '12345',
    required: true,
    type: String,
  })
  password: string;
}
