import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ensureFound } from 'r2/utils/ensureFound';

import { CommunityService } from '../community';

import { CreatePostDto } from './dto';
import { Post } from './entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private communityService: CommunityService,
  ) {}

  async create(authorId: number, createPostDto: CreatePostDto) {
    // Will throw if it doesn't exist
    await this.communityService.findOne({ id: createPostDto.communityId });
    return this.postRepo.save({ ...createPostDto, authorId });
  }

  findIn({ communityId }: { communityId: number }) {
    return this.postRepo.find({ communityId });
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne(id);
    ensureFound(post, 'Post não encontrado');
    return post;
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepo.delete({ id: post.id });
  }
}
