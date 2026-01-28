import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { TypeormModule } from '@/database/typeorm/typeorm.module';

@Module({
  imports: [TypeormModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders, UserService],
})
export class UserModule {}
