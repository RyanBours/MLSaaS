import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Transcription {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: true })
  text?: string;
}
