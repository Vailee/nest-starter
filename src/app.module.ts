import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: 'redis://175.178.88.89:6379',
    //   options: {
    //     password: '123456',
    //   },
    // }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('🚀 ~ configService:', configService.get('REDIS_URL'));
        return {
          type: 'single',
          url: 'redis://175.178.88.89:6379',
          options: {
            password: '123456',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
