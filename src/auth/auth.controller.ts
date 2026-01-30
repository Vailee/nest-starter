import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SigninUserDto } from '@/auth/dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { name, password } = dto;
    return this.authService.signin(name, password);
  }
  
  @Post('/signup')
  signup(
    // new ParseArrayPipe({ items: SigninUserDto }) 多个参数需要管道转换时使用
    @Body(new ParseArrayPipe({ items: SignupUserDto })) dto: SignupUserDto,
  ) {
    const { name, password, email } = dto;
    console.log('signup', dto);
    return this.authService.signup(name, password, email);
  }
}

export default AuthController;
