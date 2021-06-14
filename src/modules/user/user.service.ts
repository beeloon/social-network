import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/database/entities/user-entity';
import { USER_REPOSITORY } from 'src/database/database.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUser: CreateUserDto): Promise<User> {
    const user = new User(createUser);
    return await this.userRepository
      .save(user)
      .catch((error) => error.message);
  }
  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }
}
