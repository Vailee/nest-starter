import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // 让 Nest 知道怎么创建 PrismaService
  exports: [PrismaService], // 导出，供外部模块使用
})
export class PrismaModule {}
