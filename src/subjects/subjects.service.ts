import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subjects } from "../database/entities";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { UsersService } from "../users/users.service";
import { RoleEnum } from "src/auth/enums/role.enum";

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,

    private usersService: UsersService,
  ) {}

  async create(data: CreateSubjectDto) {
    try {
      if (await this.subjectExists(data.name)) {
        throw new BadRequestException(
          `A subject with this name: ${data.name} already exists.`,
        );
      }

      const newSubject = this.subjectsRepository.create(data);

      await this.subjectsRepository.save(newSubject);

      return newSubject;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async subjectExists(name: string) {
    try {
      return await this.subjectsRepository.exists({ where: { name } });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async list() {
    try {
      return await this.subjectsRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async show(id: number) {
    try {
      const subject = await this.subjectsRepository.findOne({ where: { id } });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      return subject;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateSubjectDto) {
    try {
      await this.show(id);

      await this.subjectsRepository.update(id, data);

      return await this.show(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.show(id);

      await this.subjectsRepository.delete(id);

      return { message: "Subject deleted successfully." };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async addInstructor(id: number, instructorId: number) {
    try {
      const subject = await this.show(id);

      const instructor = await this.usersService.show(instructorId);

      if (instructor.role !== RoleEnum.instructor) {
        throw new BadRequestException(
          "This user is not an instructor, please choose another one.",
        );
      }

      subject.instructor = instructor;

      await this.subjectsRepository.save(subject);

      return await this.subjectsRepository.findOne({
        where: { id },
        relations: { instructor: true },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async addStudent(id: number, userId: number) {
    try {
      const subject = await this.subjectsRepository.findOne({
        where: { id },
        relations: { students: true },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      const student = await this.usersService.show(userId);

      subject.students.push(student);

      await this.subjectsRepository.save(subject);

      return await this.subjectsRepository.findOne({
        where: { id },
        relations: { students: true },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
