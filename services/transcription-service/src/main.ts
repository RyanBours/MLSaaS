import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';

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
