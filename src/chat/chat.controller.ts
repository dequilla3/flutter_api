import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('get-chats')
  async findAll() {
    const chats = await this.chatService.findAll();
    return chats;
  }
}
