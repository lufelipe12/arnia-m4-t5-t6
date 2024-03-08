import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDoc {
  @ApiProperty({
    type: String,
    example: "BMW",
    description: "Cars brand.",
  })
  brand: string;

  @ApiProperty({
    type: String,
    example: "BMW 320i",
    description: "Cars model.",
  })
  model: string;

  @ApiProperty({
    type: String,
    example: "Yellow",
    description: "Cars color.",
  })
  color: string;

  @ApiProperty({
    type: Number,
    example: 2020,
    description: "Cars year of fabrication.",
  })
  year: number;
}
