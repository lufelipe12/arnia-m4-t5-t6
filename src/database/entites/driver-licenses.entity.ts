import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from './users.entity';

@Entity('driver_licenses')
export class DriverLicenses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, unique: true })
  licenseNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, (user) => user.driverLicense)
  @JoinColumn()
  user: Users;
}
