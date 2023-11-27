import { Module } from "@nestjs/common";
import GcSpeechService from "./gc-speech.service";
import { GcStorageService } from "./gs-storage.service";
import { GcController } from './gc.controller';

@Module({
    providers: [GcSpeechService, GcStorageService],
    exports: [GcSpeechService, GcStorageService],
    controllers: [GcController]
})

export class GcModule {}