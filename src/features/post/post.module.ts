import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommunityModule } from '../community';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommunityModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
