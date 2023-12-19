import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';
import { TranscriptionService } from '../transcription/transcription.service';

@Controller('transcription')
export class TranscriptioController {
    constructor(
        private readonly transcriptionService: TranscriptionService
    ) {}

    @MessagePattern(undefined)
    async getPubMessages(@Ctx() context: GCPubSubContext) {
        const msg = context.getMessage();
        if (msg.attributes.objectId.slice(0, -5) == ".json") {
            await this.transcriptionService.updateTranscriptionStatus(msg.attributes.objectId.slice(0, -5), "DONE");
        }
        msg.ack();
    }
}
