import { UserService } from '@/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    const isAdmin = await this.userService.findOne(user.id);
    console.log('isAdmin', isAdmin);
    return true;
  }
}
