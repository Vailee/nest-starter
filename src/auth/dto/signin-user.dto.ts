import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    message: (ctx: any) => {
      return `Password must be between ${ctx.constraints[0]} and ${ctx.constraints[1]} characters long`;
    },
  })
  password: string;
}
