import { Injectable } from '@nestjs/common';

import { User } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, username: 'edu', email: 'edu@jamelon.com', password: 'changeme' },
    { id: 2, username: 'ana', email: 'ana@jamelon.com', password: 'changeme1' },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }
}
