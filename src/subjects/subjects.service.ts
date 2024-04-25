import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subjects } from "../database/entities";
import { Repository } from "typeorm";

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
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
}
