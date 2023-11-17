import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transcription } from './transcription.model';
import { TranscriptionService } from './transcription.service';
import { query } from 'express';

@Resolver('Transcription')
export class TranscriptionResolver {
  constructor(private transcriptionService: TranscriptionService) {}

  @Query((returns) => Transcription)
  async transcription(@Args('id', { type: () => Int }) id: number) {
    return this.transcriptionService.findOneById(id);
  }

  @Query((returns) => String)
  test(@Args('file_name') file_name: string) {
    const transcribeAudio = this.transcriptionService.createTranscription(file_name);
    return transcribeAudio;
  }

  @Query((returns) => String)
  createSignedUrl(@Args('file_name') file_name: string) {
    const url = this.transcriptionService.createSignedUrl(file_name);
    return url;
  }

  @Query((returns) => String)
  createTranscription(@Args('file_name') file_name: string) {
    const url = this.transcriptionService.createTranscription(file_name);
    return url;
  }
}
