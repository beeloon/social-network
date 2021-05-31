import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../../db/entities/Users/user';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
  ) {}

  async create(createUser: CreateUserDto): Promise<Users> {
    return this.usersRepository.create<Users>(createUser);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll<Users>();
  }

  async findById(id: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async delete(id: string): Promise<number> {
    return this.usersRepository.destroy({ where: { id } });
  }
}
