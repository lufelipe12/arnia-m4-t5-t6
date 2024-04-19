import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column('float')
  price: number;

  @Column('float')
  area: number;

  @ManyToOne(() => User, (user) => user.sellHouses)
  seller: User;

  @ManyToOne(() => User, (user) => user.houses)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
