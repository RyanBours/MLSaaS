import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || 4002;

  app.connectMicroservice<MicroserviceOptions>(
    {
      strategy: new GCPubSubServer({
        topic: 'transcription-created',
        subscription: 'transcriptions',
        client: {
          projectId: 'mlsaas',
        },
      }),
    },
  );

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
