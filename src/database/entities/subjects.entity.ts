import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity("subjects")
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64, nullable: false, unique: true })
  name: string;

  @Column({ type: "int", nullable: false })
  code: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int", nullable: false })
  credits: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  campus: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  classRoom: string;

  @ManyToOne(() => Users, (user) => user.subjects)
  instructor: Users;

  @ManyToMany(() => Users, (users) => users.assignSubjects)
  @JoinTable()
  students: Users[];
}
