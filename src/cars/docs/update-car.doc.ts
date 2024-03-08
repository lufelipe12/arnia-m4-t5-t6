import { PartialType } from "@nestjs/swagger";

import { CreateCarDoc } from "./create-car.doc";

export class UpdateCarDoc extends PartialType(CreateCarDoc) {}
