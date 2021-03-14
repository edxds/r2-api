import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
