import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
// import { PrismaService } from '@/database/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailerService,
  ) {}
  @Get('mail')
  sendMail() {
    return this.mailService
      .sendMail({
        to: 'vailee@126.com',
        from: '"NB Team" <502791869@qq.com>',
        subject: 'Test',
        template: './welcome',
        context: {
          name: 'NB Team',
        },
      })
      .then((res) => {
        console.log('🚀 ~ res:', res);
      })
      .catch((err) => {
        console.log('🚀 ~ err:', err);
      });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<any> {
    return this.userService.findOneUser(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
