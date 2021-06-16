import { IsNotEmpty, Length, IsUUID } from 'class-validator';

export class CreateFollowerDto {
  @IsUUID('4')
  @IsNotEmpty()
  @Length(36)
  followerId: string;

  @IsUUID('4')
  @IsNotEmpty()
  @Length(36)
  targetId: string;
}
