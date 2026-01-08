import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    message: (ctx) => `${ctx} is not a valid email`,
  })
  password: string;
}
