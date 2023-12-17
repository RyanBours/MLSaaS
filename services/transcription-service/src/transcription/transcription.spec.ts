import { Test } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { TranscriptionService } from "./transcription.service";
import { GcStorageService } from "../gc/gc-storage.service";
import { GcSpeechService } from "../gc/gc-speech.service";

describe('TranscriptionResolver', () => {
    let prisma: PrismaService;
    let service: TranscriptionService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [TranscriptionService, PrismaService, GcStorageService, GcSpeechService],
        })
            .compile();

        service = moduleRef.get<TranscriptionService>(TranscriptionService);
        prisma = moduleRef.get<PrismaService>(PrismaService)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
