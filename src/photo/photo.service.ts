import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY') // 注入 PHOTO_REPOSITORY 令牌
    private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async findOne(id: number): Promise<Photo> {
    return this.photoRepository.findOne({ where: { id } });
  }

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = this.photoRepository.create(createPhotoDto);
    return this.photoRepository.save(photo);
  }

  async update(
    id: number,
    updatePhotoDto: Partial<CreatePhotoDto>,
  ): Promise<Photo> {
    await this.photoRepository.update(id, updatePhotoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
