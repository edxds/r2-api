import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { MinimalSocialProfile, User, UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      return this.stripPassword(user);
    }

    return null;
  }

  async validateUserById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findById({ id });
    if (user) {
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

  private stripPassword(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
