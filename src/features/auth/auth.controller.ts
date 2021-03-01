import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from '../users';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('local')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.generateJwtAndAttach(req, res);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  // This function serves only as a container for the Google sign-in redirect
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  google() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.generateJwtAndAttach(req, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  async check(@Req() req: Request) {
    return { message: "You're in!", user: req.user };
  }

  private async generateJwtAndAttach(req: Request, res: Response) {
    const result = await this.authService.login(req.user as Omit<User, 'password'>);
    const isSecure = req.secure;
    res.cookie('token', result.access_token, { secure: isSecure, httpOnly: true });

    return result;
  }
}
