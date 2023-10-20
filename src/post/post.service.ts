import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostFeed } from 'src/model/postfeed.entity';
import { Repository } from 'typeorm';
import { PostInterface } from './post.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostFeed)
    private postRepository: Repository<PostFeed>,
    private userService: UserService,
  ) {}

  async findAll() {
    const data = await this.postRepository.find({ relations: ['user'] });
    return {
      message: 'success',
      data,
    };
  }

  fineOneById(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async create(post: PostInterface) {
    const userById = await this.userService.findOneById(post.userId);

    const postToPost = new PostFeed();
    postToPost.message = post.message;
    postToPost.date = new Date();
    postToPost.image = post.image;
    postToPost.user = userById;

    return this.postRepository.save(this.postRepository.create(postToPost));
  }
}
