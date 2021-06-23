import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { TokenService } from './token.service';

import { User } from 'src/database/entities';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { TokenPair } from './auth.interface';
import { UserPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  generatePayload({ id, username, email }): UserPayload {
    return { id, username, email };
  }

  async issueTokenPair(user: UserPayload | User): Promise<TokenPair> {
    const tokens = this.tokenService.generateTokens(this.generatePayload(user));

    return tokens;
  }

  async login(user: UserPayload): Promise<TokenPair> {
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
    const dbToken = await this.tokenService.find({ value: refreshToken });
    if (!dbToken) {
      throw new NotFoundException('Refresh token not found.');
    }

    const tokenPayload = this.tokenService.validate(dbToken.value);
    const user = await this.userService.findById(tokenPayload.id);
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async signup(createUserDto: CreateUserDto): Promise<TokenPair> {
    const user = await this.userService.create(createUserDto);
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async validateUser(email: string, pass: string): Promise<UserPayload> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Incorrect email.');
    }

    const isPassportValid = await bcrypt.compare(pass, user.password);
    if (!isPassportValid) {
      throw new UnauthorizedException('Incorrect password.');
    }

    return this.generatePayload(user);
  }
}
