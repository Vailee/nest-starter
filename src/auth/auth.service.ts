import { UserService } from '@/user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(name: string, password: string) {
    const user = await this.userService.findOneByName(name);
    console.log('signin user:', user);
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Password not match');
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(name: string, password: string, email: string) {
    // 检查用户是否已存在
    const existingUser = await this.userService.findOneByName(name);
    if (existingUser) {
      throw new ForbiddenException('Username already exists');
    }
    return await this.userService.create({
      name,
      password,
      email,
    });
  }
}
