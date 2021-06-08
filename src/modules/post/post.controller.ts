import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { IPost } from '../../db/entities/Post/post.schema';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async addPost(
    //@Body('id') id: string,
    @Body('title') title: string,
    @Body('text') text: string,
  ): Promise<IPost> {
    const result = this.postService.insertPost(title, text);
    return result;
  }

  @Get()
  async getAllPosts(): Promise<IPost[]> {
    const posts = await this.postService.getAllPosts();
    return posts;
    //  const posts = await this.PostService.getAllPosts()
    // return posts;
  }

  @Get(':id')
  async getSinglePost(@Param('id') postId: string): Promise<IPost> {
    return this.postService.getSinglePost(postId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('text') text: string,
  ): Promise<IPost> {
    const updatedPost = await this.postService.updateProduct(id, title, text);
    return updatedPost;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string): Promise<void> {
    await this.postService.deleteProduct(prodId);
  }
}
