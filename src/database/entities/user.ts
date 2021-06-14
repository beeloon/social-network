import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserDto } from '../../modules/user/dto/create-user-dto';

@Unique(['id'])
@Unique(['email'])
@Entity()
export class User {
  constructor(userDto: CreateUserDto) {
    Object.assign(this, userDto);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', update: false })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', update: false })
  createdAt: Date;

  @BeforeInsert()
  async beforeInsertActions() {
    this.id = uuidv4();
    this.password = await bcrypt.hash(this.password, 10);
  }
}
