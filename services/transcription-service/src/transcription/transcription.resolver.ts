import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transcription } from './transcription.model';
import { TranscriptionService } from './transcription.service';

@Resolver('Transcription')
export class TranscriptionResolver {
  constructor(private transcriptionService: TranscriptionService) {}

  @Query((returns) => Transcription)
  async transcription(@Args('id', { type: () => Int }) id: number) {
    return this.transcriptionService.findOneById(id);
  }

  @Query((returns) => String)
  createTranscription(@Args('file_name') file_name: string) {
    const url = this.transcriptionService.createSignedUrl(file_name);
    return url;
  }
}
