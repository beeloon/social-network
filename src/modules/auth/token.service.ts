import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { RefreshToken } from '../../database/entities';

import { REPOSITORY } from '../../database/database.constants';

import { TokenField, TokenPair } from './auth.interface';
import { UserPayload } from './auth.interface';

@Injectable()
export class TokenService {
  constructor(
    @Inject(REPOSITORY.RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(user: UserPayload): Promise<TokenPair> {
    const accessToken = this.jwtService.sign(user, {
      secret: this.configService.get('tokens.access.secret'),
      expiresIn: this.configService.get('tokens.access.expiresIn'),
    });

    const refresh = this.jwtService.sign(user, {
      secret: this.configService.get('tokens.refresh.secret'),
      expiresIn: this.configService.get('tokens.refresh.expiresIn'),
    });

    const { value: refreshToken } = await this.save(user.id, refresh);

    return {
      accessToken,
      refreshToken,
    };
  }

  async find(options: TokenField): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository.findOne(options);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async save(userId: string, refreshToken: string): Promise<RefreshToken> {
    const tokenData = await this.find({ user_id: userId });

    if (tokenData) {
      return tokenData;
    }

    try {
      const token = await this.refreshTokenRepository.save({
        user_id: userId,
        value: refreshToken,
      });

      return token;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async remove(refreshToken: string): Promise<boolean> {
    try {
      const { affected: numberOfDeletedRows } =
        await this.refreshTokenRepository.delete({
          value: refreshToken,
        });

      return numberOfDeletedRows > 0;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  validate(token: string): UserPayload {
    try {
      const refreshSecret = this.configService.get('tokens.refresh.secret');
      const userInfo = this.jwtService.verify(token, { secret: refreshSecret });

      return userInfo;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token signature');
    }
  }
}
