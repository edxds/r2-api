import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from './user.entity';
import { MinimalSocialProfile } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: RegisterUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.userRepository.save({
      ...user,
      password: await hash(user.password, 5),
      needsSetup: false,
    });

    return result;
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findBySocialIdOrCreate(
    socialId: string,
    profile?: MinimalSocialProfile,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { socialId } });
    if (!user) {
      if (!profile) {
        return;
      }

      let generatedUsername: string;
      let conflictingUser: User | undefined;
      let tries = 0;

      do {
        if (tries >= 5) {
          throw new HttpException('Não foi possível gerar um nome de usuário temporário', 409);
        }

        generatedUsername = this.generateUniqueUsername(profile.username);
        conflictingUser = await this.userRepository.findOne({
          where: { username: generatedUsername },
        });

        tries++;
      } while (conflictingUser);

      const { id, ..._profile } = profile;
      return await this.userRepository.save({
        ..._profile,
        socialId: id,
        username: generatedUsername,
        needsSetup: true,
        password: '',
      });
    }
  }

  private generateUniqueUsername(prefix: string) {
    return `${prefix}_${this.generateRandomSixDigitNumber()}`;
  }

  private generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}

export class RegisterUserDto {
  @IsEmail(undefined, { message: 'O e-mail fornecido não é válido' })
  email: string;

  @IsNotEmpty({ message: 'O nome de usuário é obrigatório!' })
  username: string;

  @Length(6, undefined, { message: 'Sua senha precisa ter no mínimo 6 dígitos' })
  password: string;
}
