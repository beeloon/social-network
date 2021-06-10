import { IsNotEmpty, Length } from 'class-validator';

export class CreateFollowerDto {
  @IsNotEmpty()
  @Length(36)
  followerId: string;

  @IsNotEmpty()
  @Length(36)
  targetId: string;
}
