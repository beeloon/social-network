import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  hash: string;

  @Column()
  user_id: number;

  @Column()
  expires: Date;
}
