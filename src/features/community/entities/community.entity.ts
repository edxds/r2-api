import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from 'r2/features/users';
import { Post } from 'r2/features/post/entities';

@Unique('UQ_CODE', ['code'])
@Entity({ name: 'communities' })
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  desc?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: false })
  isPrivate: boolean;

  @ManyToMany(() => User, (user) => user.joinedCommunities)
  members: User[];

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];
}
