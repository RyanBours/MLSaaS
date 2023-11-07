import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionResolver } from './transcription.resolver';
import { UsersResolver } from './user.resolver';

@Module({
  providers: [TranscriptionResolver, TranscriptionService, UsersResolver],
})
export class transcriptionModule {}
