import { CreateUserDto } from './dto/create-user-dto';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../db/entities/Users/user';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    return this.usersRepository.create<User>(createUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async delete(id: string): Promise<number> {
    return this.usersRepository.destroy({ where: { id } });
  }
}
