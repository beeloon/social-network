import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 255)
  title: string;

  @IsOptional()
  text: string;
}
