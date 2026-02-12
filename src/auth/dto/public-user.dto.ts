import { SignupUserDto } from '@/auth/dto/signup-user.dto';
import { Exclude, Expose } from 'class-transformer';

export class PublicUserDto extends SignupUserDto {
  @Expose()
  id: string | number;

  @Expose()
  name: string;

  @Exclude()
  password: string;

  constructor(partialDto: Partial<PublicUserDto>) {
    super();
    Object.assign(this, partialDto);
  }
}
