import { ApiProperty } from "@nestjs/swagger";
import { CreateCarDoc } from "./create-car.doc";

export class CreateCarResponseDoc extends CreateCarDoc {
  @ApiProperty({
    type: Number,
    example: new Date().getTime(),
    description: "Unique identifier for car.",
  })
  id: number;
}
