import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { RefreshToken } from '../../entities';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private configService: ConfigService,
  ) {}

  async create(userId): Promise<RefreshToken> {
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

  async delete(userId) {
    const token = await this.refreshTokenRepository.delete({ user_id: userId });

    return token;
  }

  async generate(userId): Promise<string> {
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

  async verify(userId, token: string): Promise<boolean> {
    const dbToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    if (dbToken == null) {
      return false;
    }

    const isTokensEqual = await bcrypt.compare(token, dbToken.hash);

    return isTokensEqual;
  }
}
