import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Community } from './entities';
import { CreateCommunityDto, UpdateCommunityDto } from './dto';

@Injectable()
export class CommunityService {
  constructor(@InjectRepository(Community) private communityRepo: Repository<Community>) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    try {
      return await this.communityRepo.save({ ...createCommunityDto });
    } catch (error) {
      if (error.constraint === 'UQ_CODE')
        throw new HttpException('Uma comunidade já existe com esse código', 409);

      throw error;
    }
  }

  findAll(): Promise<Community[]> {
    return this.communityRepo.find();
  }

  async findOne(id: number): Promise<Community> {
    const community = await this.communityRepo.findOne(id);
    if (!community) {
      throw new HttpException('A comunidade não existe', 404);
    }

    return community;
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto): Promise<Community> {
    const community = await this.findOne(id);
    return this.communityRepo.save({ id, ...community, ...updateCommunityDto });
  }

  async remove(id: number) {
    const community = await this.findOne(id);
    return this.communityRepo.delete({ id: community.id });
  }
}
