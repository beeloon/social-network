import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Unique(['id'])
@Unique(['email'])
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
