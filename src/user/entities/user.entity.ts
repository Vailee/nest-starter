import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  email: string;

  @Column()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
