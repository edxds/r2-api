import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Token } from './token.entity';

export type TokenCreationResult = {
  access_token: string;
};

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>, //
    private jwtService: JwtService,
  ) {}

  async createAndPersist({
    userId,
    agent,
  }: {
    userId: number;
    agent: string;
  }): Promise<TokenCreationResult> {
    const payload = this.generateJwtPayload(userId, agent);

    // We need to persist first so that the id property is set
    const persistedToken = await this.persistToken(payload);
    const signedJwt = await this.jwtService.signAsync(persistedToken);

    return { access_token: signedJwt };
  }

  async revoke(tokenId: number) {
    return this.tokenRepository.delete(tokenId);
  }

  async wasRevoked(tokenId: number) {
    const token = await this.tokenRepository.findOne(tokenId);
    return !token || token.revoked;
  }

  private generateJwtPayload(userId: number, agent: string): Token {
    return {
      id: 0,
      sub: userId,
      agent,
    };
  }

  private async persistToken(payload: Token) {
    return this.tokenRepository.save(payload);
  }
}
