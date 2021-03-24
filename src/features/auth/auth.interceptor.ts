import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    if (request.cookies['token']) {
      // Refreshes expiry date
      this.authService.attachTokenToResponse(request.cookies['token'], response);
    }

    return next.handle();
  }
}
