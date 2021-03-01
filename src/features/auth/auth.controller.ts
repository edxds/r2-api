import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { User } from '../users';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('local')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(req.user as Omit<User, 'password'>);
    const isSecure = req.secure;
    res.cookie('token', result.access_token, { secure: isSecure, httpOnly: true });

    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  async check() {
    return { message: "You're in!" };
  }
}
