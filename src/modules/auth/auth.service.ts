import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { TokenService } from './token.service';

import { User } from 'src/database/entities';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { TokenPair } from './interfaces/token-pair.interface';
import { AuthenticatedUserInfo } from './interfaces/authenticated-user-info.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async issueTokenPair(
    userInfo: AuthenticatedUserInfo | User,
  ): Promise<TokenPair> {
    const { id, email, username } = userInfo;
    const payload = { id, email, username };
    const tokens = this.tokenService.generateTokens(payload);

    return tokens;
  }

  async signup(createUserDto: CreateUserDto): Promise<TokenPair> {
    const user = await this.userService.create(createUserDto);
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUserInfo> {
    const user = await this.userService.findByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(pass, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    const authenticatedUserInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return authenticatedUserInfo;
  }

  async login(user: AuthenticatedUserInfo): Promise<TokenPair> {
    const tokenPair = await this.issueTokenPair(user);
    return tokenPair;
  }

  async logout(refreshToken: string): Promise<HttpStatus> {
    const isTokenDeleted = await this.tokenService.remove(refreshToken);

    if (isTokenDeleted) {
      return HttpStatus.OK;
    }

    return HttpStatus.NO_CONTENT;
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    const dbToken = await this.tokenService.find(refreshToken);
    const userPayload = this.tokenService.validate(dbToken.value);

    const { id, username, email } = await this.userService.findById(
      userPayload.id,
    );
    const tokenPair = await this.issueTokenPair({ id, username, email });

    return { ...tokenPair };
  }
}
