import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EventPhoto } from './event-photo.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  eventName: string;

  @Column()
  eventDate: Date;

  @OneToMany(() => EventPhoto, (photo) => photo.event)
  photos: EventPhoto[];

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable()
  participants: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
