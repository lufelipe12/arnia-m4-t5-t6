import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { Subjects } from "../database/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Subjects])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
