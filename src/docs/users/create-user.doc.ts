import { ApiProperty } from "@nestjs/swagger";

import { RoleEnum } from "../../auth/enums/role.enum";

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    example: "Fabim",
    required: true,
    description: "Users first name.",
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: "Dias",
    required: true,
    description: "Users last name.",
  })
  lastName: string;

  @ApiProperty({
    type: String,
    example: "fabim@gmail.com",
    required: true,
    description: "Users email for login.",
  })
  email: string;

  @ApiProperty({
    type: String,
    example: "12345",
    required: true,
    description: "Users password.",
  })
  password: string;

  @ApiProperty({
    type: RoleEnum,
    enum: RoleEnum,
    example: RoleEnum.instructor,
    required: false,
    description: "Users role.",
    default: RoleEnum.student,
  })
  role?: RoleEnum;

  @ApiProperty({
    type: Number,
    example: 35,
    required: true,
    description: "Users age.",
  })
  age: number;
}
