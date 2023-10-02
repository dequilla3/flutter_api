import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PostFeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image: string;
}
