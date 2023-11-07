import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'Admin',
    },
    {
      id: 2,
      username: 'User',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: number): User {
    return this.users.find((user) => user.id === id);
  }
}
