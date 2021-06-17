import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PostSchema } from '../../database/entities/post.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostService } from './post.service';
import { UpdateResult } from 'typeorm';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async addPost(
    @Body()
    postDto: CreatePostDto,
  ): Promise<PostSchema | undefined> {
    return await this.postService.createPost(postDto);
  }

  @Get()
  async getAllPosts(): Promise<PostSchema[]> {
    return await this.postService.getAllPosts();
  }

  @Get(':id')
  async getSinglePost(@Param('id') postId: string): Promise<PostSchema> {
    return await this.postService.getSinglePost(postId);
  }

  @Patch(':id')
  async updatePostById(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.postService.deletePost(id);
  }
}
