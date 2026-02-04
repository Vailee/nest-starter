import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 对密码hash处理
    const { password } = createUserDto;
    const newHashPass = await argon2.hash(password);
    return this.userRepository.save({
      ...createUserDto,
      password: newHashPass,
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async findOneByName(name: string) {
    return this.userRepository.findOne({
      where: {
        name,
      },
    });
  }

  async removeByName(name: string) {
    return this.userRepository.delete({
      name,
    });
  }

  async updateByName(name: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(
      {
        name,
      },
      updateUserDto,
    );
  }
}
