import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';

import { MinimalSocialProfile } from '../users';

import { AuthService } from './auth.service';
import { constants } from './constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: constants.google.clientId,
      clientSecret: constants.google.clientSecret,
      callbackURL: constants.google.callbackUrl,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(_accessToken: any, _refreshToken: any, profile: Profile) {
    const user = await this.authService.validateUserBySocialLogin(
      profile.id,
      this.createGoogleMinimalSocialProfile(profile),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private createGoogleMinimalSocialProfile(profile: Profile): MinimalSocialProfile {
    const email = profile.emails?.[0].value;
    if (!email) {
      throw new HttpException('E-mail não retornado pelo provedor', 400);
    }

    return {
      id: profile.id,
      name: profile.name?.givenName,
      username: email.split('@')[0],
      email,
    };
  }
}
