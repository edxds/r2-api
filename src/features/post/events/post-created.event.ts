import { Post } from '../entities';

export class PostCreatedEvent {
  static eventName = 'posts.created';
  constructor(public readonly post: Post) {}
}
