import { CreatePostDto } from './dto/create-post-dto';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostSchema } from '../../database/entities/postSchema-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdatePostDto } from './dto/update-post-dto';
import { POST_SCHEMA_REPOSITORY } from '../../database/database.constants';
@Injectable()
export class PostService {
  constructor(
    @Inject(POST_SCHEMA_REPOSITORY)
    private postRepository: Repository<PostSchema>,
  ) {}
  public async createPost(dto: CreatePostDto): Promise<PostSchema> {
    return this.postRepository.save(dto);
  }

  public async getAllPosts(): Promise<PostSchema[]> {
    try {
      const result = this.postRepository.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getSinglePost(postId: string): Promise<PostSchema> {
    try {
      const post = await this.postRepository.findOne({ where: { postId } });

      return post;
    } catch (error) {
      console.log(error);
    }
  }
  public async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  public async deletePost(id: string): Promise<DeleteResult> {
    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
