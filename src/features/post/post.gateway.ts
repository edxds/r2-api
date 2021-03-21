import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Server, Socket } from 'socket.io';

import { GatewayAuthGuard } from '../auth/gateway.guard';

import { PostCreatedEvent, PostDeletedEvent } from './events';

@WebSocketGateway({ namespace: '/posts' })
export class PostGateway {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(PostGateway.name);

  @UseGuards(GatewayAuthGuard)
  @SubscribeMessage('join')
  handleJoinRequest(client: Socket, data: any) {
    const { communityId, parentPostId } = data;

    if (!communityId)
      throw new WsException({ message: 'Malformed request', at: 'data.communityId', data });

    const room = this.getRoomPath(communityId, parentPostId);
    client.join(room);

    this.logger.log(`Socket #${client.id} joined room ${room}`);
  }

  @OnEvent(PostCreatedEvent.eventName)
  handlePostCreated(payload: PostCreatedEvent) {
    const room = this.getRoomPath(payload.post.communityId, payload.post.parentPostId);
    this.server.in(room).emit('created', payload.post);
    this.logger.log(`Post created in ${room}`);
  }

  @OnEvent(PostDeletedEvent.eventName)
  handlePostDeleted(payload: PostDeletedEvent) {
    const room = this.getRoomPath(payload.communityId, payload.parentPostId);
    this.server.in(room).emit('deleted', { postId: payload.postId });
    this.logger.log(`Post deleted in ${room}`);
  }

  private getRoomPath(communityId: number, parentPostId?: number) {
    let path = `post-in/${communityId}`;
    if (parentPostId) path += `/${parentPostId}`;
    return path;
  }
}
