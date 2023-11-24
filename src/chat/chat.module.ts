import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from 'src/model/chat.entity';
import { User } from 'src/model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  providers: [ChatService, UserService],
  controllers: [ChatController],
})
export class ChatModule {}
