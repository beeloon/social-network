import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../Users/user';
import { CreateFollowerDto } from '../../../modules/follower/dto/create-follower-dto';

@Entity()
export class Followers {
  constructor(followerDto?: CreateFollowerDto) {
    Object.assign(this, followerDto);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: {
      Pending: 'Pending',
      Accepted: 'Accepted',
      Declined: 'Declined',
    },
    default: 'Pending',
  })
  status: string;

  @ManyToOne(() => User)
  follower: User;

  @ManyToOne(() => User)
  target: User;
}
