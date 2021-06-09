import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      name: 'john',
      email: 'john@test.com',
      password: 'password',
    },
    {
      id: 2,
      name: 'maria',
      email: 'maria@test.com',
      password: 'password',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[] | undefined> {
    return this.users;
  }

  async create(user: User): Promise<User[] | undefined> {
    try {
      this.users.push(user);

      return this.users;
    } catch (err) {
      console.error(err);
    }
  }
}
