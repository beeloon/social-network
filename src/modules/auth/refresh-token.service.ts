import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { RefreshToken } from '../../database/entities';

import { REFRESH_TOKEN_REPOSITORY } from 'src/database/database.constants';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private refreshTokenRepository: Repository<RefreshToken>,
    private configService: ConfigService,
  ) {}

  async create(userId: number): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();

    refreshToken.value = uuid();
    refreshToken.hash = await bcrypt.hash(refreshToken.value, 10);
    refreshToken.user_id = userId;
    refreshToken.expires = new Date();
    refreshToken.expires.setDate(
      refreshToken.expires.getDate() + this.configService.get('refresh.ttl'),
    );

    const savedToken = await this.refreshTokenRepository.save(refreshToken);

    return savedToken;
  }

  async delete(userId: number) {
    const token = await this.refreshTokenRepository.delete({
      user_id: userId,
    });

    return token;
  }

  async generate(userId: number): Promise<string> {
    const existedToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    if (existedToken && this.isNotExpired(existedToken.expires)) {
      return existedToken.value;
    }

    const newToken = await this.create(userId);

    return newToken.value;
  }

  isNotExpired(expires: Date): boolean {
    return expires > new Date();
  }

  async verify(userId: number, token: string): Promise<boolean> {
    const dbToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    if (dbToken == null) {
      return false;
    }

    const isTokensValid = await bcrypt.compare(token, dbToken.hash);

    return isTokensValid;
  }
}
