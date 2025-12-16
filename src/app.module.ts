import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
// import { RedisModule } from '@nestjs-modules/ioredis';
// import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    //  way 1
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: 'redis://175.178.88.89:6379',
    //   options: {
    //     password: '123456',
    //   },
    // }),
    // way 2
    // RedisModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log('🚀 ~ configService:', configService.get('REDIS_URL'));
    //     return {
    //       type: 'single',
    //       url: 'redis://175.178.88.89:6379',
    //       options: {
    //         password: '123456',
    //       },
    //     };
    //   },
    // }),
    // CacheModule.register
    CacheModule.register({
      ttl: 20000,
      store: redisStore,
      host: '175.178.88.89',
      port: 6379,
      password: '123456',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
