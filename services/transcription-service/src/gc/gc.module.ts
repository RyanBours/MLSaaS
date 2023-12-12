import { Module } from "@nestjs/common";
import { GcSpeechService } from "./gc-speech.service";
import { GcStorageService } from "./gc-storage.service";

@Module({
    providers: [GcSpeechService, GcStorageService],
    exports: [GcSpeechService, GcStorageService],
})

export class GcModule {}