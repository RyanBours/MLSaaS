import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { PubSub } from '@google-cloud/pubsub';

@Injectable()
export class UsersService {
  pubsub: any;
  constructor() {
    this.pubsub = new PubSub({
      projectId: 'mlsaas'
    });

    this.pubsub.subscription('users').on('message', (message) => {
      console.log("message received");
      console.log(message.data.toString());
      // this.deleteUser(parseInt(message.data.toString()));
      message.ack();
    });
  }
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

  deleteUser(id: number,): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User #${id} not found`);
    }
    this.pubsub.topic('user-deleted').publish(Buffer.from(JSON.stringify(user.id)));
    console.log(`User #${id} deleted`);
    return user;
  }
}
