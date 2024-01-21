
import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Transcription } from '../transcription/transcription.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
    @Field((type) => ID)
    @Directive('@external')
    id: number;

    @Field((type) => [Transcription])
    transcriptions?: Transcription[];
}
