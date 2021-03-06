import {
  Check,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Community } from '../community/entities';
import { Post } from '../post/entities';

@Unique('UQ_USERNAME', ['username'])
@Unique('UQ_EMAIL', ['email'])
@Check('CK_EITHER_SOCIAL_OR_PASSWORD', `"social_id" is not null or "password" is not null`)
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true })
  socialId?: string;

  @Column({ default: false })
  needsSetup: boolean;

  @ManyToMany(() => Community, (community) => community.members)
  @JoinTable({ name: 'community_members' })
  joinedCommunities: Community[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Promise<Post[]>;
}
