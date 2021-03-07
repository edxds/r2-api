import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users';
import { TimeModule } from '../time';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokensService, Token } from './tokens';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { constants } from './constants';

@Module({
  imports: [
    UsersModule,
    TimeModule,
    PassportModule,
    JwtModule.register({ secret: constants.secret }),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy, TokensService],
  controllers: [AuthController],
})
export class AuthModule {}
