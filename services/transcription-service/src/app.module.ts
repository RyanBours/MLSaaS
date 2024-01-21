import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { GcModule } from './gc/gc.module';
import { User } from './orphans/user.entity';
import { TranscriptionModule } from './transcription/transcription.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ComplexityPlugin } from './plugins/gql-complexity.plugin';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrometheusModule.register({
      path: 'metrics',
      defaultMetrics: {
        enabled: true,
        config: {
          prefix: 'transcription_',
        },
      },
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    TranscriptionModule,
    GcModule,
    PrismaModule,
  ],
  providers: [GoogleStrategy, ComplexityPlugin],

})
export class AppModule {}
