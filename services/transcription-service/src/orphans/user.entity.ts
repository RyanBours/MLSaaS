
import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Transcription } from '../transcription/transcription.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
    @Field((type) => ID)
    id: number;

    @Field((type) => [Transcription])
    transcriptions?: Transcription[];
}
