import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth';
import { CommunityModule } from '../community';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { PostGateway } from './post.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommunityModule, AuthModule],
  controllers: [PostController],
  providers: [PostService, PostGateway],
})
export class PostModule {}
