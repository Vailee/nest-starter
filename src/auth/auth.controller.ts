import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Post,
  // UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SigninUserDto } from '@/auth/dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
// import { SerializeInterceptor } from '@/common/interceptors/serialize.interceptor';
import { PublicUserDto } from '@/auth/dto/public-user.dto';
import { Serialize } from '@/common/decorators/serialize.decorator';
import { CreateUserPipe } from '@/auth/pipes/create-user.pipe';

@Controller('auth')
// @UseInterceptors(SerializeInterceptor)
class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { name, password } = dto;
    return this.authService.signin(name, password);
  }
  // 使用nest默认的interceptor处理signup
  // @Post('/signup')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async signup(
  //   // new ParseArrayPipe({ items: SigninUserDto }) 多个参数需要管道转换时使用
  //   @Body() dto: SignupUserDto,
  // ): Promise<PublicUserDto> {
  //   const { name, password, email } = dto;
  //   console.log('signup', dto);
  //   const user = await this.authService.signup(name, password, email);
  //   return new PublicUserDto(user);
  // }

  @Post('/signup')
  // @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(PublicUserDto) // 使用自定义的Serialize装饰器，传入需要转换的DTO类，这样就不需要在每个控制器方法中手动创建DTO实例了
  async signup(
    // new ParseArrayPipe({ items: SigninUserDto }) 多个参数需要管道转换时使用
    @Body(CreateUserPipe) dto: SignupUserDto,
  ): Promise<PublicUserDto> {
    const { name, password, email } = dto;
    console.log('signup', dto);
    const user = await this.authService.signup(name, password, email);
    // return new PublicUserDto({ ...user });
    return user;
  }
}

export default AuthController;
