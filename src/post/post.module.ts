import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostFeed } from 'src/model/postfeed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostFeed, User])],
  controllers: [PostController],
  providers: [PostService, UserService],
  exports: [PostService],
})
export class PostModule {}
