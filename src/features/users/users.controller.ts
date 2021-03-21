import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  async whoami(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('communities')
  async communities(@Req() request: Request) {
    if (!request.user) {
      throw new HttpException('Você precisa fazer login primeiro', 403);
    }

    return this.usersService.joinedCommunities(request.user['id']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  async posts(@Req() { user }: Request) {
    if (!user) throw new HttpException('Você precisa fazer login primeiro', 403);
    return this.usersService.posts(user['id']);
  }
}
