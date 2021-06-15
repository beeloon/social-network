import {
  Entity,
  Column,
  BeforeInsert,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async beforeInsertActions() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
