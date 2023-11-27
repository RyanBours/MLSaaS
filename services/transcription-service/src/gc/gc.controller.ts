import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';
import { GcStorageService } from './gs-storage.service';

@Controller('gc')
export class GcController {
    constructor(private readonly gcStorage: GcStorageService) {}

    @MessagePattern(undefined)
    async getPubMessages(@Ctx() context: GCPubSubContext) {
        const msg = context.getMessage();
        const response = JSON.parse(msg.data.toString());
        console.log(response.name)
        const file_content = await this.gcStorage.fetchFileContent("mlsaas_transcriptions", response.name);
        console.log(file_content);
        msg.ack();
    }
}
