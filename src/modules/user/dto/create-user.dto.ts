import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 255)
  username: string;

  @IsEmail()
  email: string;

  @Length(8, 24)
  password: string;
}
