import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  constructor(private userService: UserService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {
    const user = await this.userService.findOneById(body.usrId);
    this.server.emit('onMessage', {
      message: body.msg,
      user: user,
    });
  }

  @SubscribeMessage('newPost')
  async onNewPost(@MessageBody() body: any) {
    this.server.emit('onPost', body);
  }
}
