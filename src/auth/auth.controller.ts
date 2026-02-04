import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SigninUserDto } from '@/auth/dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { SerializeInterceptor } from '@/common/interceptors/serialize.interceptor';
import { PublicUserDto } from '@/auth/dto/public-user.dto';

@Controller('auth')
@UseInterceptors(SerializeInterceptor)
class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { name, password } = dto;
    return this.authService.signin(name, password);
  }

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(
    // new ParseArrayPipe({ items: SigninUserDto }) 多个参数需要管道转换时使用
    @Body() dto: SignupUserDto,
  ): Promise<PublicUserDto> {
    const { name, password, email } = dto;
    console.log('signup', dto);
    const user = await this.authService.signup(name, password, email);
    return new PublicUserDto(user);
  }
}

export default AuthController;
