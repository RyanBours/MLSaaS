import { Module, forwardRef } from "@nestjs/common";
import GcSpeechService from "./gc-speech.service";
import { GcStorageService } from "./gs-storage.service";
import { GcController } from './gc.controller';
import { TranscriptionModule } from "src/transcription/transcription.module";

@Module({
    providers: [GcSpeechService, GcStorageService],
    exports: [GcSpeechService, GcStorageService],
    controllers: [GcController],
    imports: [forwardRef(() => TranscriptionModule)]
})

export class GcModule {}