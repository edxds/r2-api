export class PostDeletedEvent {
  static eventName = 'posts.deleted';
  constructor(
    public readonly postId: number,
    public readonly communityId: number,
    public readonly parentPostId?: number,
  ) {}
}
