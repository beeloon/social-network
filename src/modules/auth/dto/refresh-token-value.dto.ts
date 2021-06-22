import { IsUUID } from 'class-validator';

export class RefreshTokenValueDto {
  @IsUUID('4')
  refreshToken: string;
}
