import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TimeService } from '../time';
import { MinimalSocialProfile, User, UsersService } from '../users';

export type AuthJwtPayload = {
  sub: number;
  username: string;
  hash: string;
  agent: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, //
    private timeService: TimeService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password === password) {
      return this.stripPassword(user);
    }

    return null;
  }

  async validateUserBySocialLogin(
    socialId: string,
    profile?: MinimalSocialProfile,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findBySocialIdOrCreate(socialId, profile);
    if (user) {
      return this.stripPassword(user);
    }

    return null;
  }

  async login(user: Omit<User, 'password'>, agent: string): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync(this.generateJwtPayload(user, agent)),
    };
  }

  private stripPassword(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private generateJwtPayload(user: Omit<User, 'password'>, agent: string): AuthJwtPayload {
    return {
      sub: user.id,
      username: user.username,
      hash: this.timeService.getCurrentTimestampHash(),
      agent,
    };
  }
}
