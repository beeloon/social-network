import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Post } from '../../database/entities/post.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { REPOSITORY } from '../../database/database.constants';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject(REPOSITORY.Post)
    private postRepository: Repository<Post>,
    @Inject(REPOSITORY.User)
    private userRepository: Repository<User>,
  ) {}

  public async createPost(dto: CreatePostDto): Promise<Post | undefined> {
    const owner = await this.userRepository.findOne(dto.ownerId);
    if (!owner) {
      throw new NotFoundException("User doesn't exist");
    }
    try {
      const post = await this.postRepository.save(dto);
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
      const post = await this.postRepository.findOne(postId);
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
    const findPostForUpdate = await this.postRepository.findOne(id);
    if (!findPostForUpdate) {
      throw new NotFoundException(`Post with id: ${id} doesn't exists`);
    }
    return await this.postRepository.update(findPostForUpdate, updatePostDto);
  }

  public async deletePost(id: string): Promise<string> {
    try {
      const findPostForDelete = await this.postRepository.findOne(id);
      if (!findPostForDelete) {
        throw new NotFoundException(`Post with id: ${id} doesn't exists`);
      }
      await this.postRepository.remove(findPostForDelete);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}
