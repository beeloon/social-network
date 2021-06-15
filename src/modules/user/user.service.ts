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
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  public async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
