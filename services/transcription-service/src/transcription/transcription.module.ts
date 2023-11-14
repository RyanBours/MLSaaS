import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionResolver } from './transcription.resolver';
import { UsersResolver } from './user.resolver';
import { GcModule } from 'src/gc/gc.module';

@Module({
  providers: [TranscriptionResolver, TranscriptionService, UsersResolver],
  imports: [GcModule],
})
export class transcriptionModule {}
