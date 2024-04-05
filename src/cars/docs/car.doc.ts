import { ApiProperty } from '@nestjs/swagger';

export class CarDoc {
  @ApiProperty({
    title: 'ID',
    description: 'Unique identifier for a car.',
    example: 10,
    type: Number,
  })
  id: number;

  @ApiProperty({
    title: 'Car Name',
    description: 'A car name for the model.',
    example: 'Monza',
    type: String,
  })
  carName: string;

  @ApiProperty({
    title: 'Car year.',
    description: 'The year of car release.',
    example: 2022,
    type: Number,
    minimum: 1885,
    maximum: new Date().getFullYear(),
  })
  year: number;

  @ApiProperty({
    title: 'Car brand',
    description: 'The cars manufacturer.',
    example: 'Volkswagen',
    type: String,
  })
  brand: string;

  @ApiProperty({
    title: 'Cars color.',
    description: 'The color for a car.',
    example: 'brown',
    type: String,
  })
  color: string;

  @ApiProperty({
    title: 'Created date on database.',
    description: 'Date for a car creation on database.',
    example: '2024-03-27T22:57:35.202Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    title: 'Update date on database.',
    description: 'Date for a car update on database.',
    example: '2024-03-27T22:57:35.202Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    title: 'Deleted date on database.',
    description: 'Date for a car deletion on database.',
    example: '2024-03-29T22:57:35.202Z',
    type: Date,
  })
  deletedAt?: Date;
}
