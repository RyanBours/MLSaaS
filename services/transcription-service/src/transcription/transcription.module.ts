import { Module } from '@nestjs/common';
import { GcModule } from '../gc/gc.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TranscriptioController } from './transcription.controller';
import { TranscriptionResolver } from './transcription.resolver';
import { TranscriptionService } from './transcription.service';
import { UsersResolver } from './user.resolver';

@Module({
  controllers: [TranscriptioController],
  providers: [TranscriptionResolver, TranscriptionService, UsersResolver],
  exports: [TranscriptionService],
  imports: [GcModule, PrismaModule],
})
export class TranscriptionModule {}
