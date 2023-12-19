import { Injectable } from '@nestjs/common';
import { Transcription } from './transcription.model';
import { GcStorageService } from '../gc/gc-storage.service';
import { GcSpeechService } from '../gc/gc-speech.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TranscriptionService {
  constructor(
    private readonly gcStorageService: GcStorageService,
    private readonly gcSpeechService: GcSpeechService,
    private readonly prismaService: PrismaService
  ) {}

  async findAll(): Promise<Transcription[]> {
    return this.prismaService.transcription.findMany();
  }

  async findOneById(id: number): Promise<Transcription> {
    return this.prismaService.transcription.findUnique({
      where: {
        id: id
      }
    })
  }

  async findByUserId(user_id: number): Promise<Transcription[]> {
    const res = await this.prismaService.transcription.findMany({
      where: {
        userId: user_id
      }
    })
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
