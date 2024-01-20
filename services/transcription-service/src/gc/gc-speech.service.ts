import { Injectable } from "@nestjs/common";
import { SpeechClient } from "@google-cloud/speech";

@Injectable()
export class GcSpeechService {
    SpeechClient: any;
    constructor() {
        this.SpeechClient = new SpeechClient({
            projectId: 'mlsaas',
        });
    }

    async transcribeAudio(audio_id: string): Promise<string> {
        console.log(audio_id);
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: {
                uri: `gs://mlsaas_transcriptions/${audio_id}`
            },
            outputConfig: {
                gcsUri: `gs://mlsaas_transcriptions/${audio_id}.json`,
            },
            config: config,
        };

        const [operation] = await this.SpeechClient.longRunningRecognize(request);

        if (operation.error) {
            throw operation.error;
        }


        return operation.name
    }
}