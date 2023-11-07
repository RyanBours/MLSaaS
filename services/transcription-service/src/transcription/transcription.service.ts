import { Injectable } from '@nestjs/common';
import { Transcription } from './transcription.model';

@Injectable()
export class TranscriptionService {
  private readonly transcriptios: Transcription[] = [
    {
      id: 1,
      text: 'Admin',
    },
    {
      id: 2,
      text: 'User',
    },
  ];

  findAll(): Transcription[] {
    return this.transcriptios;
  }

  findOneById(id: number): Transcription {
    return this.transcriptios.find((transcription) => transcription.id === id);
  }
}
