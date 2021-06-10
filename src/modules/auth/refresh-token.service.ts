import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { RefreshToken } from './entities/reftesh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async saveTokenToDB(token, userId, expires) {
    await this.refreshTokenRepository.save({
      value: token,
      user_id: userId,
      expires,
    });
  }

  async find(userId) {
    return await this.refreshTokenRepository.find({ user_id: userId });
  }

  async create(userId: string, ttl: number) {
    // CHECK IS TOKEN ALREADY EXIST => RETURN THIS TOKEN
    const refreshToken = uuid();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 15);

    const expires = new Date();
    expires.setDate(expires.getDate() + ttl);

    await this.saveTokenToDB(hashedRefreshToken, userId, expires);

    return refreshToken;
  }

  async verify(token: string) {
    const hashedToken = await bcrypt.hash(token, 15);
    const dbToken = await this.refreshTokenRepository.findOne({
      where: { value: hashedToken },
    });

    // TODO: MAKE VALID TOKEN VERIFICATION
    return dbToken;
  }

  async delete(userId) {
    const token = await this.refreshTokenRepository.delete({ user_id: userId });

    return token;
  }
}
