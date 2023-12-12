import { Module, forwardRef } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscriptionResolver } from './transcription.resolver';
import { UsersResolver } from './user.resolver';
import { GcModule } from 'src/gc/gc.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TranscriptionResolver, TranscriptionService, UsersResolver],
  exports: [TranscriptionService],
  imports: [forwardRef(() => GcModule), PrismaModule],
})
export class TranscriptionModule {}
