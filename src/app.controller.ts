import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
// import { User } from './user/entities/user.entity';
// import { InjectRedis } from '@nestjs-modules/ioredis';
// import { Redis } from 'ioredis';
import { CacheInterceptor } from '@nestjs/cache-manager';

let a = 0;
@Controller()
@UseInterceptors(CacheInterceptor) // 开启接口缓存
export class AppController {
  // @InjectModel('User') private userModel: Model<User>,
  // @InjectRedis() private readonly redis: Redis,
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get()
  @Version('1')
  getHelloV2(): string {
    return 'Hello World! v1';
  }
  @Get()
  @Version('2')
  async testRedis(
    @Query('token') token: string,
  ): Promise<Record<string, string>> {
    console.log('🚀 ~ AppController ~ testRedis ~ token:', token);
    // const res = await this.redis.get(token);
    // await this.redis.set('token', token || '123456', 'EX', 60 * 10); // 10分钟过期
    a = a + 1;
    return { token: a.toString() };
  }
}
