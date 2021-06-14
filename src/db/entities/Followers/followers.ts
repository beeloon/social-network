import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../Users/user';

@Entity()
export class Followers {
  constructor(followerUser: User, targetUser: User) {
    this.followerId = followerUser;
    this.targetId = targetUser;
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

  @ManyToOne(() => User, (user) => user.followerId)
  @JoinColumn({ name: 'followerId', referencedColumnName: 'id' })
  followerId: User;

  @ManyToOne(() => User, (user) => user.targetId)
  @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
  targetId: User;
}
