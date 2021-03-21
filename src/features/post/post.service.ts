import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

import { ensureFound } from 'r2/utils/ensureFound';

import { CommunityService } from '../community';

import { Post } from './entities';
import { CreatePostDto } from './dto';
import { PostCreatedEvent, PostDeletedEvent } from './events';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private communityService: CommunityService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(authorId: number, createPostDto: CreatePostDto) {
    // Will throw if it doesn't exist
    await this.communityService.findOne({ id: createPostDto.communityId });
    const post = await this.postRepo.save({ ...createPostDto, authorId });
    const postWithRelations = await this.postRepo.findOne(post.id, {
      relations: ['author', 'replies'],
    });

    this.eventEmitter.emit(PostCreatedEvent.eventName, new PostCreatedEvent(postWithRelations!));

    return post;
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
    await this.postRepo.delete({ id: post.id });

    this.eventEmitter.emit(
      PostDeletedEvent.eventName,
      new PostDeletedEvent(post.id, post.communityId, post.parentPostId),
    );

    return post;
  }
}
