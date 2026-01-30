import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  // @Length(6, 20, {
  //   message: (ctx) => `${ctx} is not a valid email`,
  // })
  password: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    message: (ctx: any) => `${ctx} is not a valid password`,
  })
  email: string;
}
