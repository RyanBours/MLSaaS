import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Transcription as Transcription } from './transcription.model';
import { TranscriptionService } from './transcription.service';

@Resolver('Transcription')
export class TranscriptionResolver {
  constructor(private transcriptionService: TranscriptionService) {}

  @Query((returns) => Transcription)
  async transcription(@Args('id', { type: () => Int }) id: number) {
    return this.transcriptionService.findOneById(id);
  }
}
