import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RefreshToken } from './entities/reftesh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(userId, ttl: number): Promise<string> {
    const existedToken = await this.refreshTokenRepository.findOne({
      user_id: userId,
    });

    if (existedToken && this.isNotExpired(existedToken.expires)) {
      return existedToken.value;
    }

    const refreshToken = uuid();
    const expires = new Date();

    expires.setDate(expires.getDate() + ttl);

    await this.save(refreshToken, userId, expires);

    return refreshToken;
  }

  isNotExpired(expires: Date): boolean {
    return expires > new Date();
  }

  async delete(userId) {
    const token = await this.refreshTokenRepository.delete({ user_id: userId });

    return token;
  }

  async save(token, userId, expires) {
    const savedToken = await this.refreshTokenRepository.save({
      value: token,
      user_id: userId,
      expires,
    });

    return savedToken;
  }

  async verify(token: string) {
    const dbToken = await this.refreshTokenRepository.findOne({
      value: token,
    });

    // TODO: MAKE VALID TOKEN VERIFICATION
    return dbToken;
  }
}
