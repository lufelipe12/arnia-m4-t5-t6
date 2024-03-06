import { Module } from "@nestjs/common";

import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";

@Module({
  imports: [],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
