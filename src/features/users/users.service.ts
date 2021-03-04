import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { MinimalSocialProfile } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, username: 'edu', email: 'edu@jamelon.com', password: 'changeme', needsSetup: false },
    { id: 2, username: 'ana', email: 'ana@jamelon.com', password: 'changeme1', needsSetup: false },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async findBySocialIdOrCreate(
    socialId: string,
    profile?: MinimalSocialProfile,
  ): Promise<User | undefined> {
    const user = this.users.find((u) => u.socialId === socialId);
    if (!user) {
      if (!profile) {
        return;
      }

      const newUser = {
        username: '__undefined',
        ...profile,
        password: '',
        socialId: profile.id,
        needsSetup: true,
        id: this.users[this.users.length - 1].id + 1,
      };

      this.users.push(newUser);
      console.log(this.users);
      return newUser;
    }
  }
}
