import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { DriverLicenses } from './driver-licenses.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64, nullable: false, select: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => DriverLicenses, (dl) => dl.user, { onDelete: 'CASCADE' })
  driverLicense: DriverLicenses;

  @BeforeInsert()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log('error on password hash', error);

      throw new BadRequestException('Error on password hash.');
    }
  }
}
