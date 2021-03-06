import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub: number;

  @Column()
  agent: string;

  @Column({ default: false })
  revoked?: boolean;
}
