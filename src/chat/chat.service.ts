import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/model/chat.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private userService: UserService,
  ) {}

  async findAll() {
    const data = await this.chatRepository.find({
      relations: ['fromuser', 'touser'],
    });
    return {
      message: 'success',
      data,
    };
  }
}
