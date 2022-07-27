import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostInput } from './dto/create-post.input';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostInput: CreatePostInput, user: string) {
    return await this.postModel.create({ ...createPostInput, user });
  }

  async findAll() {
    return await this.postModel.find();
  }

  async findOne(id: string) {
    return await this.postModel.findById(id);
  }
}
