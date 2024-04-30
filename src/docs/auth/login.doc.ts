import { ApiProperty } from "@nestjs/swagger";

export class LoginDoc {
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
}
