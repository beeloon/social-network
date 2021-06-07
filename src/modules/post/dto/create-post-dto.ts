import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(2, 255)
  title: string;

  @IsNotEmpty()
  @Length(2, 255)
  text: string;
}
