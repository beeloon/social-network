import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UserModule } from '../user/user.module';

import { DatabaseModule } from 'src/database/database.module';
import { refreshTokenProvider, userProvider } from 'src/database/providers';
import { TokenService } from './token.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('tokens.access.secret'),
        signOptions: {
          expiresIn: configService.get('tokens.access.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ConfigService,
    TokenService,
    JwtStrategy,
    LocalStrategy,
    ...userProvider,
    ...refreshTokenProvider,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
