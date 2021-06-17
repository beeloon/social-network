import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from 'src/database/entities';
import { REPOSITORY } from 'src/database/database.constants';

@Injectable()
export class PostService {
  constructor(
    @Inject(REPOSITORY.Post)
    private postRepository: Repository<Post>,
  ) {}

  public async createPost(dto: CreatePostDto): Promise<Post> {
    try {
      const post = this.postRepository.save(dto);
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllPosts(): Promise<Post[]> {
    try {
      const result = this.postRepository.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getSinglePost(postId: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOneOrFail(postId);
      if (!post) {
        throw new Error();
      }
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  public async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    const findPostForUpdate = await this.postRepository.findOneOrFail(id);
    if (!findPostForUpdate) {
      `Post with id: ${id} doesn't exists`;
    }
    return await this.postRepository.update(findPostForUpdate, updatePostDto);
  }

  public async deletePost(id: string): Promise<string> {
    try {
      const findPostForDelete = await this.postRepository.findOneOrFail(id);
      if (!findPostForDelete) {
        return `Post with id: ${id} doesn't exists`;
      }
      await this.postRepository.remove(findPostForDelete);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}
