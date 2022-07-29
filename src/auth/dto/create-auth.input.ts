import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AccountLoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class SignupInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  fullname: string;
}
