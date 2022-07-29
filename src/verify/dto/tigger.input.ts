import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GeneralTriggerInput {
  @Field(() => String)
  userId: string;

  type?: string;
}

@InputType()
export class TriggerPhoneBvnInput {
  @Field(() => String)
  userId: string;
  @Field(() => String)
  bvnPhoneDigits: string;
}

@InputType()
export class TriggerWorkEmailInput {
  @Field(() => String)
  clientId: string; //clarify**
  @Field(() => String)
  workEmail: string;
}
