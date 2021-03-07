import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
