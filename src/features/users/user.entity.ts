import {
  Check,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Community } from '../community/entities';

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

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  socialId?: string;

  @Column({ default: false })
  needsSetup: boolean;

  @ManyToMany(() => Community, (community) => community.members)
  @JoinTable({ name: 'community_members' })
  joinedCommunities: Community[];
}
