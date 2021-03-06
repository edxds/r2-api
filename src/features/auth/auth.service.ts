import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Response } from 'express';

import { MinimalSocialProfile, User, UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findWithPassword({ username });
    if (user && (await compare(password, user.password))) {
      return this.stripPassword(user);
    }

    return null;
  }

  async validateUserById(id: number): Promise<Omit<User, 'password'> | undefined> {
    return await this.usersService.findById({ id });
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

  attachTokenToResponse(token: string, response: Response) {
    const twoWeeks = 14 * 24 * 3_600_000;
    const environment = process.env.NODE_ENV ?? 'development';
    response.cookie(
      'token',
      token,
      environment === 'development'
        ? {
            sameSite: 'lax',
            httpOnly: true,
            maxAge: twoWeeks,
          }
        : {
            secure: true,
            httpOnly: true,
            maxAge: twoWeeks,
          },
    );
  }

  private stripPassword(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
