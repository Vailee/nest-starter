import { Controller, Get, Query, Version } from '@nestjs/common';
// import { User } from './user/entities/user.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Controller()
export class AppController {
  constructor(
    // @InjectModel('User') private userModel: Model<User>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

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
    const res = await this.redis.get(token);
    await this.redis.set('token', token || '123456', 'EX', 60 * 10); // 10分钟过期
    return { token: res };
  }
}
