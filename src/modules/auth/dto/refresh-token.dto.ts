import { IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsUUID('4')
  refreshToken: string;
}
