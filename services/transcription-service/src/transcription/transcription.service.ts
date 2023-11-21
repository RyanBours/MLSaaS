import { Injectable } from '@nestjs/common';
import { Transcription } from './transcription.model';
import { GcStorageService } from 'src/gc/gs-storage.service';
import GcSpeechService from 'src/gc/gc-speech.service';

@Injectable()
export class TranscriptionService {
  constructor(private readonly gcStorageService: GcStorageService, private readonly gcSpeechService: GcSpeechService) {}

  private readonly transcriptios: Transcription[] = [
    {
      id: 1,
      userId: 1,
      text: 'Lorem Ipsum',
    },
    {
      id: 2,
      userId: 2,
      text: 'Dolar Sit Amet',
    },
  ];

  findAll(): Transcription[] {
    return this.transcriptios;
  }

  findOneById(id: number): Transcription {
    return this.transcriptios.find((transcription) => transcription.id === id);
  }

  findByUserId(userId: number): Transcription[] {
    const res = this.transcriptios.filter(
      (transcription) => transcription.userId === Number(userId),
    );
    return res;
  }

  async createSignedUrl(file_name: string): Promise<string> {
    const url = await this.gcStorageService.createSignedUrl("mlsaas_transcriptions", file_name);
    return url;
  }

  async createTranscription(file_name: string) {
    const result = await this.gcSpeechService.transcribeAudio(file_name);
    return result;
  }
}
