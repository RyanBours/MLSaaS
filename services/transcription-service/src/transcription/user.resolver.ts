import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TranscriptionService } from './transcription.service';
import { User } from '../orphans/user.entity';
import { Transcription } from './transcription.model';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @ResolveField(() => [Transcription])
  transcriptions(@Parent() user: User): Transcription[] {
    return this.transcriptionService.findByUserId(user.id);
  }
}