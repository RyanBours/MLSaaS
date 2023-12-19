import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transcription } from './transcription.model';
import { TranscriptionService } from './transcription.service';

@Resolver('Transcription')
export class TranscriptionResolver {
  constructor(private transcriptionService: TranscriptionService) {}

  @Query((returns) => Transcription)
  async transcription(@Args('id', { type: () => Int }) id: number) {
    return await this.transcriptionService.findOneById(id);
  }

  @Query((returns) => [Transcription])
  async transcriptions() {
    return await this.transcriptionService.findAll();
  }

  @Mutation((returns) => String)
  createSignedUrl(@Args('file_name') file_name: string) {
    const url = this.transcriptionService.createSignedUrl(file_name);
    return url;
  }

  @Mutation((returns) => String)
  createTranscription(@Args('file_name') file_name: string) {
    const url = this.transcriptionService.createTranscription(file_name);
    return url;
  }

  @Query((returns) => String)
  fetchTranscription(@Args('transcription_id', { type: () => String }) transcription_id: string) {
    const transcription_text = this.transcriptionService.fetchTranscriptionFromGC(transcription_id);
    return transcription_text;
  }
}
