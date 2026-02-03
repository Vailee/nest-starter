import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/common/guards/admin/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增用户
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // 查询所有用户
  @Get()
  async findAllUsers() {
    return this.userService.findAll();
  }

  // 根据id查询用户
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // 根据id删除用户
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 根据id更新用户
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  // 根据用户名查询用户
  @Get('name/:name')
  // 守卫从下往上执行，
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 在一起的话从前往后执行
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findUserByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  // 根据用户名删除用户
  @Delete('name/:name')
  async deleteUserByName(@Param('name') name: string) {
    return this.userService.removeByName(name);
  }

  // 根据用户名更新用户
  @Patch('name/:name')
  async updateUserByName(
    @Param('name') name: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateByName(name, updateUserDto);
  }
}
