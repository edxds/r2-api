import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { constants } from './constants';
import { AuthService } from './auth.service';
import { Token, TokensService } from './tokens';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private tokensService: TokensService, //
    private authService: AuthService,
  ) {
    super({
      ignoreExpiration: true,
      secretOrKey: constants.secret,
      jwtFromRequest: (request) => {
        let token = request?.cookies?.token ?? request?.signedCookies?.token;
        if (!token) {
          token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        }

        return token;
      },
    } as StrategyOptions);
  }

  async validate(token: Token) {
    if (await this.tokensService.wasRevoked(token.id)) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.validateUserById(token.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
