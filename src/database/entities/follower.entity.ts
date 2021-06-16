import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'followers' })
export class Follower {
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

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'followerId', referencedColumnName: 'id' })
  followerId: User;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
  targetId: User;
}
