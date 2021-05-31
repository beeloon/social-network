import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from '../../db/entities/Users/user';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.userService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return this.userService.update(id, updateUserDto);
  }
}
