import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/entities/auth.entity';

export type VerifyDocument = Verify & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Verify {
  @Field()
  _id: string;

  @Prop({ required: true, type: String })
  @Field()
  type: string;

  @Prop({ required: true, type: String })
  @Field()
  code: string;

  @Prop({ type: String })
  @Field()
  extra?: string;

  @Prop({ type: Boolean })
  @Field()
  isExpired: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User | string;
}

export const VerifySchema = SchemaFactory.createForClass(Verify);

VerifySchema.index({ username: 1 });
