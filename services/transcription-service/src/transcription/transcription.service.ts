import { Injectable } from '@nestjs/common';
import { Transcription } from './transcription.model';

@Injectable()
export class TranscriptionService {
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
}
