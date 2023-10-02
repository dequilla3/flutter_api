import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { decryptWithAES } from '../util/crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.userService.findOneBy(username);

    if (!user) {
      throw new UnauthorizedException('Username not found!');
    }

    if (decryptWithAES(user?.password) !== pass) {
      throw new UnauthorizedException('Incorrect Password!');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
