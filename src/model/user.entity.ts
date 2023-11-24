import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostFeed } from './postfeed.entity';
import { Chat } from './chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ type: 'timestamptz', nullable: true })
  dateTime: Date;

  @Column({ nullable: true })
  isActive: boolean;

  @OneToMany(() => PostFeed, (post) => post.user)
  posts: PostFeed[];

  @OneToMany(() => Chat, (chat) => chat.fromuser)
  chatsfrom: Chat[];

  @OneToMany(() => Chat, (chat) => chat.touser)
  chatsto: Chat[];
}
