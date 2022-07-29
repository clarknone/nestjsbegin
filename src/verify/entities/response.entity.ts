import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TriggerResponse {
  @Field(() => Boolean)
  ok: boolean;
  @Field(() => String)
  message?: string;
}
