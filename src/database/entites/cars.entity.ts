import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CarPhotos } from './car-photos.entity';

@Entity('cars')
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  carName: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  brand: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.cars, { onDelete: 'SET NULL' })
  user: Users;

  @OneToMany(() => CarPhotos, (cf) => cf.car)
  photos: CarPhotos[];
}
