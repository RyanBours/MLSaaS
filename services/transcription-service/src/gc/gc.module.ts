import { Module } from "@nestjs/common";
import { GcSpeechService } from "./gc-speech.service";
import { GcStorageService } from "./gc-storage.service";
import { GcPubSubService } from "./gc-pubsub.service";

@Module({
    providers: [GcSpeechService, GcStorageService, GcPubSubService],
    exports: [GcSpeechService, GcStorageService, GcPubSubService],
})

export class GcModule {}