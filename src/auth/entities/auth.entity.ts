import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field()
  _id: string;

  @Prop({ required: true, type: String, unique: true })
  @Field()
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  @Field()
  fullname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 });
