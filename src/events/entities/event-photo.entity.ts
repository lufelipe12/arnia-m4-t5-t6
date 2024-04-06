import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class EventPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageLink: string;

  @ManyToOne(() => Event, (event) => event.photos)
  event: Event;
}
