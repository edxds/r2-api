import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { constants } from './constants';
import { Token, TokensService } from './tokens';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private tokensService: TokensService) {
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

    return { id: token.sub };
  }
}
