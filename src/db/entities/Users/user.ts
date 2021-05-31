import {
  BeforeCreate,
  Column,
  Model,
  PrimaryKey,
  Table,
  Default,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model {
  @Default(uuidv4())
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @BeforeCreate
  static async hashPasswordBeforeUpdate(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  }
}
