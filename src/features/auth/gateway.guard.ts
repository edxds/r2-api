import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { parse as parseCookies } from 'cookie';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

import { Token } from './tokens';
import { constants } from './constants';
import { JwtStrategy } from './jwt.strategy';

const verifyToken = (token: string, secret: string) =>
  new Promise<Token>((resolve, reject) => {
    verify(token, secret, (error, token) => {
      if (error) return reject(error);
      resolve(token as Token);
    });
  });

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private strategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext) {
    const socket = context.switchToWs().getClient() as Socket;
    const cookies = socket.handshake.headers['cookie'];
    if (!cookies) {
      throw new WsException('Cookies not present in handshake!');
    }

    const parsedCookies = parseCookies(cookies);
    const token = parsedCookies['token'];

    if (!token) {
      throw new WsException('Token not present in cookies!');
    }

    const decodedToken = await verifyToken(token, constants.secret!);
    return !!this.strategy.validate(null, decodedToken);
  }
}
