import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { constants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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

  async validate(payload: { sub: number; username: string }) {
    return { userId: payload.sub, username: payload.username };
  }
}