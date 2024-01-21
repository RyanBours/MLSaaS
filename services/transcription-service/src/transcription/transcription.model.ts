import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/orphans/user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Transcription {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  userId: number;

  @Field((type) => User, { nullable: true, complexity: 5 })
  user?: User;

  @Field((type) => String)
  transcriptionId: string;

  @Field((type) => String)
  status: string;
}
