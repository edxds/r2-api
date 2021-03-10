import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  async whoami(@Req() request: Request) {
    return request.user;
  }
}
