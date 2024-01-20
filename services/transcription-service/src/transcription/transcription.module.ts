import { Module } from '@nestjs/common';
import { GcModule } from '../gc/gc.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TranscriptioController } from './transcription.controller';
import { TranscriptionResolver } from './transcription.resolver';
import { TranscriptionService } from './transcription.service';
import { UsersResolver } from './user.resolver';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [TranscriptioController],
  providers: [TranscriptionResolver, TranscriptionService, UsersResolver],
  exports: [TranscriptionService],
  imports: [GcModule, PrismaModule, MetricsModule],
})
export class TranscriptionModule {}
