import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteResult, Repository } from 'typeorm';
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

  async create(userId: string): Promise<RefreshToken> {
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

  async delete(userId: string): Promise<DeleteResult> {
    const deletedTokenResultInfo = await this.refreshTokenRepository.delete({
      user_id: userId,
    });

    return deletedTokenResultInfo;
  }

  async generate(userId: string): Promise<string> {
    const existedToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    // If token expired and user login will throw duplicate tokens err
    if (existedToken && !this.isExpired(existedToken)) {
      return existedToken.value;
    }

    const newToken = await this.create(userId);

    return newToken.value;
  }

  isExpired(token: RefreshToken): boolean {
    return token.expires <= new Date();
  }

  isValid(tokenValue: string, token: RefreshToken): boolean {
    return bcrypt.compareSync(tokenValue, token.hash);
  }

  async verify(userId: string, token: string): Promise<RefreshToken> {
    const dbToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    if (dbToken == null || !this.isValid(token, dbToken)) {
      throw new BadRequestException('Invalid refresh token');
    }

    return dbToken;
  }
}
