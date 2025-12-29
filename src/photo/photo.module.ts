import { Module } from '@nestjs/common';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { TypeormModule } from '@/database/typeorm/typeorm.module';
import { PhotoController } from './photo.controller';

@Module({
  imports: [TypeormModule],
  controllers: [PhotoController],
  providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}
