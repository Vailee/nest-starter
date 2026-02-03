import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(name: string, password: string) {
    const user = await this.userService.findOneByName(name);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Password not match');
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(name: string, password: string, email: string) {
    const user = await this.userService.create({
      name,
      password,
      email,
    });
    return user;
  }
}
