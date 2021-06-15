import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/database/entities/user-entity';
import { USER_REPOSITORY } from 'src/database/database.constants';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUser: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUser);
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    } catch (error) {
      console.log(error);
    }
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
