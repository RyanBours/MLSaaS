import { Injectable } from "@nestjs/common";
import { SpeechClient } from "@google-cloud/speech";

@Injectable()
export default class GcSpeechService {
    SpeechClient: any;
    constructor() {
        this.SpeechClient = new SpeechClient();
    }

    async transcribeAudio(audio: Buffer): Promise<string> {
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: audio,
            config: config,
        };

        const [response] = this.SpeechClient.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        return transcription;
    }
}