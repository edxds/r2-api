import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MinimalSocialProfile, User, UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, //
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

  async login(user: Omit<User, 'password'>): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private stripPassword(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
