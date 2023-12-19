import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Transcription {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  userId: number;

  @Field((type) => String)
  transcriptionId: string;

  @Field((type) => String)
  status: string;
}
