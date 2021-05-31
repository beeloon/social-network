import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { Users } from '../../db/entities/Users/user';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string): Promise<Users> {
    return this.userService.findByEmail(email);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<number> {
    return this.userService.delete(id);
  }
}
