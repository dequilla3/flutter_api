import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ManyToOne(() => User, (user) => user.chatsfrom)
  @JoinColumn()
  fromuser: User;

  @ManyToOne(() => User, (user) => user.chatsto)
  @JoinColumn()
  touser: User;
}
