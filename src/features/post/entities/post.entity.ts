import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'r2/features/users';
import { Community } from 'r2/features/community/entities';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column()
  authorId: number;

  @Column()
  communityId: number;

  @Column({ nullable: true })
  parentPostId?: number;

  @CreateDateColumn()
  createdAt: string;

  @JoinColumn({ name: 'author_id' })
  @ManyToOne(() => User, (user) => user.posts)
  author?: User;

  @JoinColumn({ name: 'community_id' })
  @ManyToOne(() => Community, (community) => community.posts)
  community?: Community;

  @JoinColumn({ name: 'parent_post_id' })
  @ManyToOne(() => Post, (post) => post.replies, { nullable: true })
  parent?: Post;

  @OneToMany(() => Post, (post) => post.parent)
  replies?: Post[];
}
