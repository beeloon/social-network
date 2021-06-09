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

  async issueRefreshToken(userId) {
    const refreshToken = uuid();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 15);
    const expires = new Date();

    expires.setDate(expires.getDate() + 30);

    await this.saveTokenToDB(hashedRefreshToken, userId, expires);

    return refreshToken;
  }

  async verifyRefreshToken(token: string) {
    const hashedToken = await bcrypt.hash(token, 15);
    const dbToken = await this.refreshTokenRepository.findOne({
      where: { value: hashedToken },
    });

    // TODO: MAKE VALID TOKEN VERIFICATION
    return dbToken;
  }
}
