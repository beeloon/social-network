import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../database/entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { USER_REPOSITORY } from 'src/database/database.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    return this.usersRepository
      .save(new User(createUser))
      .catch((e) => e.message);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }
}
