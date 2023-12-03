import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { TranscriptionModule } from './transcription/transcription.module';
import { User } from './orphans/user.entity';
import { GcModule } from './gc/gc.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    GcModule
  ],
  providers: [GoogleStrategy],
})
export class AppModule {}
