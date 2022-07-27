import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [PostsResolver, PostsService, AuthService],
})
export class PostsModule {}
