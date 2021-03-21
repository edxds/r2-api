import { Connection, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';

import { ensureFound } from 'r2/utils/ensureFound';

import { UsersService } from '../users';

import { Community } from './entities';
import { CreateCommunityDto, UpdateCommunityDto } from './dto';

@Injectable()
export class CommunityService {
  constructor(
    private usersService: UsersService,
    @InjectConnection() private connection: Connection,
    @InjectRepository(Community) private communityRepo: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    try {
      return await this.communityRepo.save({ ...createCommunityDto });
    } catch (error) {
      if (error.constraint === 'UQ_CODE')
        throw new HttpException('Uma comunidade já existe com esse código', 409);

      throw error;
    }
  }

  findAll({ includeMembers }: { includeMembers?: boolean }): Promise<Community[]> {
    const relations = [...(includeMembers ? ['members'] : [])];
    return this.communityRepo.find({ relations });
  }

  async findOne({
    id,
    includeMembers,
    includePosts,
  }: {
    id: number;
    includeMembers?: boolean;
    includePosts?: boolean;
  }): Promise<Community> {
    const relations = [
      ...(includeMembers ? ['members'] : []),
      ...(includePosts ? ['posts', 'posts.author', 'posts.replies'] : []),
    ];
    const community = await this.communityRepo.findOne(id, { relations });
    if (!community) {
      throw new HttpException('Essa comunidade não existe', 404);
    }

    return community;
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    const community = await this.findOne({ id });
    return this.communityRepo.save({ ...community, ...updateCommunityDto });
  }

  async remove(id: number) {
    const community = await this.findOne({ id });
    return this.communityRepo.delete({ id: community.id });
  }

  async join(id: number, userId: number) {
    const user = await this.usersService.findById({ id: userId, includeCommunities: true });
    ensureFound(user, 'Usuário não encontrado!');

    const community = await this.findOne({ id });
    user.joinedCommunities = [...user.joinedCommunities, community];

    await this.connection.manager.save([user, community]);

    return community;
  }

  async leave(id: number, userId: number) {
    const user = await this.usersService.findById({ id: userId, includeCommunities: true });
    ensureFound(user, 'Usuário não encontrado!');

    const community = await this.findOne({ id, includeMembers: true });
    if (!community.members.find((u) => u.id === user.id)) {
      throw new HttpException('Você não é membro dessa comunidade!', 400);
    }

    user.joinedCommunities = user.joinedCommunities.filter((c) => c.id !== id);
    await this.connection.manager.save([user, community]);

    return community;
  }
}
