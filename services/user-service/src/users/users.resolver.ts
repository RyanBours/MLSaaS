import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }
}
