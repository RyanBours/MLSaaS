import { PubSub } from "@google-cloud/pubsub";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GcPubSubService {
    pubsub: any;
    constructor() {
        this.pubsub = new PubSub({
            projectId: 'mlsaas',
        });
        this.pubsub.subscription('users').on('message', (message) => {
            console.log(`user deletion received, ${message.data.toString()}`);
            message.ack();
        });
    }
}