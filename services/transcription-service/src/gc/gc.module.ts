import { Module } from "@nestjs/common";
import GcSpeechService from "./gc-speec.service";
import { GcStorageService } from "./gs-storage.service";

@Module({
    providers: [GcSpeechService, GcStorageService],
    exports: [GcSpeechService, GcStorageService]
})

export class GcModule {}