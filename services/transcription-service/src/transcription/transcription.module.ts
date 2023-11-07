import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionResolver } from './transcription.resolver';

@Module({
  providers: [TranscriptionResolver, TranscriptionService],
})
export class transcriptionModule {}
