import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/entities/auth.entity';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Post {
  @Field()
  _id: string;

  @Prop({ required: true, type: String })
  @Field()
  title: string;

  @Prop({ required: true, type: String })
  @Field()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User | string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ username: 1 });
