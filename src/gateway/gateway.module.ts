import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { UserService } from 'src/user/user.service';
import { User } from 'src/model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [MyGateway, UserService],
  exports: [MyGateway],
})
export class GatewayModule {}
