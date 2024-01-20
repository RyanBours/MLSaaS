import { Test } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { TranscriptionService } from "./transcription.service";
import { GcStorageService } from "../gc/gc-storage.service";
import { GcSpeechService } from "../gc/gc-speech.service";
import { ConfigService } from "@nestjs/config";
import { Transcription } from "./transcription.model";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

const transcriptions: Transcription[] = [
    {
        id: 1,
        userId: 1,
        transcriptionId: "test",
        status: "PENDING",
    },
    {
        id: 2,
        userId: 1,
        transcriptionId: "test",
        status: "PENDING",
    },
    {
        id: 3,
        userId: 1,
        transcriptionId: "test",
        status: "PENDING",
    },
];

describe('TranscriptionService', () => {
    let service: TranscriptionService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [TranscriptionService, PrismaService, GcStorageService, GcSpeechService, ConfigService],
        }).compile();

        service = moduleRef.get<TranscriptionService>(TranscriptionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of transcriptions', async () => {
            jest.spyOn(service, 'findAll').mockResolvedValue(transcriptions);
            expect(await service.findAll()).toBe(transcriptions);
        });
    });

    describe('findOneById', () => {
        it('should return a transcription', async () => {
            jest.spyOn(service, 'findOneById').mockResolvedValue(transcriptions[0]);
            expect(await service.findOneById(1)).toBe(transcriptions[0]);
        });
    });

});