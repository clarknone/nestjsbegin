import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ConfirmVerifyInput {
  @Field(() => String, { nullable: true })
  userId?: string;
  @Field(() => String)
  code: string;
  type?: string;
}
