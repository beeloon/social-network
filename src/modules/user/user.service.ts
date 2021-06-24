import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from 'src/database/entities';
import { REPOSITORY } from '../../database/database.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY.User)
    private userRepository: Repository<User>,
  ) {}

  public async create(createUser: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(createUser);
      user.password = await bcrypt.hash(user.password, 10);
      return await this.userRepository.save(user);
    } catch (err) {
      throw new ConflictException(err);
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
      const user = await this.userRepository.findOne({ where: { email } });

      if (user == null) {
        throw new NotFoundException(`User with email: ${email} doesn't exist.`);
      }

      return user;
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
