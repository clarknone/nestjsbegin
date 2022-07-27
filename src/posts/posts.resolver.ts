import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/auth.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private userServices: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Args('data') createPostInput: CreatePostInput,
    @Context() context: any,
  ) {
    const user = context.req.user;
    return this.postsService.create(createPostInput, user._id);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    const user: string = post.user.toString();
    return this.userServices.getUser(user);
  }
}
