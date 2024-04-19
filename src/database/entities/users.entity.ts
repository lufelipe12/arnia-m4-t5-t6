import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { RoleEnum } from "../../auth/enums/role.enum";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Subjects } from "./subjects.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 128, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 128, nullable: false, select: false })
  password: string;

  @Column({
    type: "enum",
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.student,
  })
  role?: RoleEnum;

  @Column({ type: "int", nullable: false })
  age: number;

  @OneToMany(() => Subjects, (subjects) => subjects.instructor)
  subjects: Subjects[];

  @ManyToMany(() => Subjects, (subjects) => subjects.students)
  assignSubjects: Subjects[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Error with password hash.");
    }
  }
}
