import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDocs {
  @ApiProperty({
    type: String,
    example: 'Hamster',
    description: 'First name of a customer',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Moura',
    description: 'Last name of a customer',
  })
  lastName: string;

  @ApiProperty({
    type: Number,
    example: 24,
    description: 'Age of a customer',
  })
  age: number;
}
