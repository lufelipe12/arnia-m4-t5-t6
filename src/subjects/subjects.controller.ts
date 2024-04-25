import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RoleEnum } from "../auth/enums/role.enum";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @Post()
  async create(@Body() data: CreateSubjectDto) {
    return await this.subjectsService.create(data);
  }

  @Get()
  async list() {
    return await this.subjectsService.list();
  }
}
