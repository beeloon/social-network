import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';

@Unique(['id'])
@Unique(['email'])
@Entity({ name: 'users' })
export class User {
  constructor(userDto: CreateUserDto) {
    Object.assign(this, userDto);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', update: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', update: false })
  createdAt: Date;
}
