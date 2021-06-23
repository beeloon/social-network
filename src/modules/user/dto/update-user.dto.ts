import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 255)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
