import { SignupUserDto } from '@/auth/dto/signup-user.dto';
import { Exclude } from 'class-transformer';

export class PublicUserDto extends SignupUserDto {
  @Exclude()
  password: string;

  constructor(partialDto: Partial<PublicUserDto>) {
    super();
    Object.assign(this, partialDto);
  }
}
