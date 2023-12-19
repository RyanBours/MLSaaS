import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TranscriptionService } from './transcription.service';
import { User } from '../orphans/user.entity';
import { Transcription } from './transcription.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @ResolveField(() => [Transcription])
  @UseGuards(AuthGuard('Google'))
  async transcriptions(@Parent() user: User): Promise<Transcription[]> {
    return await this.transcriptionService.findByUserId(user.id);
  }
}