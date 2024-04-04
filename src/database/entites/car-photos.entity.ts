import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cars } from './cars.entity';

@Entity('car_photos')
export class CarPhotos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  photoUrl: string;

  @ManyToOne(() => Cars, (cars) => cars.photos, { onDelete: 'CASCADE' })
  car: Cars;
}
