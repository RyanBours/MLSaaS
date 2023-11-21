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

    async transcribeAudio(audio_id: string): Promise<string> {
        console.log(audio_id);
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: {
                uri: `gs://mlsaas_transcriptions/${audio_id}}`
            },
            output_config: {
                gcs_uri: `gs://mlsaas_transcriptions/${audio_id}.json`,
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