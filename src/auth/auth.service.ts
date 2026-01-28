import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  signin(name: string, password: string) {
    return this.userService.findOneByName(name);
  }
  signup(name: string, password: string, email: string) {
    return this.userService.create({
      name,
      password,
      email,
    });
  }
}
