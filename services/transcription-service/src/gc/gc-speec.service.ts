import { Injectable } from "@nestjs/common";
import { SpeechClient } from "@google-cloud/speech";
import { join } from "path";

@Injectable()
export default class GcSpeechService {
    SpeechClient: any;
    constructor() {
        this.SpeechClient = new SpeechClient({
            projectId: 'mlsaas',
            keyFilename: join(__dirname, '../../mlsaas-bf40ffa583a8.json'),
        });
    }

    async transcribeAudio(audio: string): Promise<string> {
        console.log(audio);
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: {
                uri: `gs://mlsaas_transcriptions/03f4521b-a260-4cda-9ca0-c896487c0f7a`
            },
            config: config,
        };

        const [operation] = await this.SpeechClient.longRunningRecognize(request);
        const [response] = await operation.promise();
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
        return transcription;
    }
}