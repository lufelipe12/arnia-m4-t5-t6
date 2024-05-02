import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Request as Req } from "express";

import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RoleEnum } from "../auth/enums/role.enum";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("subjects")
@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiBearerAuth()
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

  @Get(":id")
  async show(@Param("id", ParseIntPipe) id: number) {
    return await this.subjectsService.show(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.subjectsService.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post(":id/instructors/:instructorId")
  async addInstructor(
    @Param("id", ParseIntPipe) id: number,
    @Param("instructorId", ParseIntPipe) instructorId: number,
  ) {
    return await this.subjectsService.addInstructor(id, instructorId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.student)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post(":id/students")
  async addStudents(
    @Param("id", ParseIntPipe) id: number,
    @Request() req: Req,
  ) {
    const { userId } = req["user"];

    return await this.subjectsService.addStudent(id, userId);
  }
}
