import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SigninUserDto } from '@/auth/dto/signin-user.dto';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signin(username, password);
  }

  @Post('/signup')
  signup(
    // new ParseArrayPipe({ items: SigninUserDto }) 多个参数需要管道转换时使用
    @Body(new ParseArrayPipe({ items: SigninUserDto })) dto: SigninUserDto,
  ) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}

export default AuthController;
