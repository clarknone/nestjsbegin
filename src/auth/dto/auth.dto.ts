import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthDTO {
  @Field()
  username: string;
  @Field()
  fullname: string;
  @Field()
  token?: string;
}
