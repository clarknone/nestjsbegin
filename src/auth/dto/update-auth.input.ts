import { AccountLoginInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(AccountLoginInput) {
  @Field(() => Int)
  id: number;
}
