import { PartialType } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmpty()
  password?: string;
}
