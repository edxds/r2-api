import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RegisterUserDto, User, UsersService } from '../users';

import { TokensService } from './tokens';

@Controller('auth')
export class AuthController {
  constructor(
    private tokensService: TokensService, //
    private userService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterUserDto) {
    try {
      return await this.userService.register(registerDto);
    } catch (error) {
      if (error.constraint === 'UQ_USERNAME')
        throw new HttpException('Um usuário já existe com esse nome de usuário', 409);
      if (error.constraint === 'UQ_EMAIL')
        throw new HttpException('Um usuário já existe com esse e-mail', 409);

      throw error;
    }
  }

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
    const user = req.user as Omit<User, 'password'>;
    const result = await this.tokensService.createAndPersist({
      userId: user.id,
      agent: req.headers['user-agent'],
    });

    const isSecure = req.secure;
    res.cookie('token', result.access_token, { secure: isSecure, httpOnly: true });

    return {
      user: req.user,
      access_token: result.access_token,
    };
  }
}
