import {
  Entity,
  Column,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/modules/user/dto/create-user-dto';
import { create } from 'domain';

@Unique(['id'])
@Unique(['email'])
@Entity({ name: 'users' }) // Name of your table in database
export class User {
  constructor(createDto: CreateUserDto){
    Object.assign(this, createDto);
  }
  @PrimaryGeneratedColumn('uuid') //Mysql doesnt have uuid
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  //  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', update: false })
  //  updatedAt: Date;

  //  @CreateDateColumn({ name: 'created_at', type: 'timestamp', update: false })
  //  createdAt: Date;

  @BeforeInsert()
  async beforeInsertActions() {
    //this.id = uuidv4();
    this.password = await bcrypt.hash(this.password, 10);
  }
}
