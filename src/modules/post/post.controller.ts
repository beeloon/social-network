import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { PostService } from './post.service';

import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

import { Post as PostEntity } from '../../database/entities/post.entity';

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async addPost(
    @Body()
    postDto: CreatePostDto,
  ): Promise<PostEntity> {
    const result = await this.postService.createPost(postDto);
    return result;
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    const posts = await this.postService.getAllPosts();
    return posts;
  }

  @Get(':id')
  async getSinglePost(@Param('id') postId: string): Promise<PostEntity> {
    return this.postService.getSinglePost(postId);
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
