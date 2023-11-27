import { Injectable } from '@nestjs/common';
import { Transcription } from './transcription.model';
import { GcStorageService } from 'src/gc/gs-storage.service';
import GcSpeechService from 'src/gc/gc-speech.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TranscriptionService {
  constructor(
    private readonly gcStorageService: GcStorageService,
    private readonly gcSpeechService: GcSpeechService,
    private readonly prismaService: PrismaService
  ) {}

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
    // TODO: create uuid from backend
    const url = await this.gcStorageService.createSignedUrl("mlsaas_transcriptions", file_name);
    return url;
  }

  // invoke transcription creation on GC
  async createTranscription(file_name: string) {
    const result = await this.gcSpeechService.transcribeAudio(file_name);
    if (result) {
      await this.prismaService.transcription.create({
        data: {
          userId: 1, // TEMP
          transcriptionId: file_name,
          status: "PENDING"
        }
      })
      return result;
    }
    throw new Error("Transcription creation failed");
  }

  async updateTranscriptionStatus(transcription_id: string, status: string) {
    const result = await this.prismaService.transcription.update({
      where: {
        transcriptionId: transcription_id
      },
      data: {
        status: status
      }
    })
    return result;
  }

  async fetchTranscriptionFromGC(transcription_id: string) {
    const file_content = await this.gcStorageService.fetchFileContent("mlsaas_transcriptions", transcription_id + ".json");
    return file_content;
  }
}
