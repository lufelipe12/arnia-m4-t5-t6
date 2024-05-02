import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDoc } from "./create-user.doc";

export class UserCreatedDoc extends CreateUserDoc {
  @ApiProperty({
    type: Number,
    example: 1,
    description: "Users unique identifier.",
  })
  id: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: "Date when user was created.",
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: "Date when user was updated.",
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: null,
    description: "Date when user was deleted.",
  })
  deletedAt?: Date;
}
