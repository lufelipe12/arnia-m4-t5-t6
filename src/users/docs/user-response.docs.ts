import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDocs {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Created Date',
    example: new Date(),
  })
  createdAt: Date;
}
