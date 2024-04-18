import { RoleEnum } from 'src/auth/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subjects } from './subjects.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.student,
  })
  role: RoleEnum;

  @Column({ type: 'int', nullable: false })
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
}
