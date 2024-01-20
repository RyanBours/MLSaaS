import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
    transcriptionCounter = new Counter({
        name: 'nestjs_transcriptions_total',
        help: 'Total number of transcriptions made',
    });

    signedUrlCounter = new Counter({
        name: 'nestjs_signed_urls_total',
        help: 'Total number of signed urls created',
    });

    constructor() {
        register.clear();
        register.setDefaultLabels({
            app: 'mlsaas',
        });
        register.registerMetric(this.transcriptionCounter);
        register.registerMetric(this.signedUrlCounter);
    }

    incrementTranscriptionCount(): void {
        this.transcriptionCounter.inc();
    }

    incrementSignedUrlCount(): void {
        this.signedUrlCounter.inc();
    }
}