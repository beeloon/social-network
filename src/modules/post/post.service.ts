import { CreatePostDto } from './dto/create-post-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from '../../db/entities/Post/post.schema';
import { PostSchema } from '../../db/entities/Post/post.schema';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostService {
  private posts: IPost[] = [];

  constructor(
    @InjectRepository(IPost)
    private postRepository: Repository<IPost>,
  ) {}

  async insertPost(createPost: CreatePostDto): Promise<IPost> {
    try {
      const id = uuidv4();
      const post = this.postRepository.save(id, createPost);
      //const post = new this.postModel({ id, title, text });
      //const result = await post.save();
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosts(): Promise<IPost[]> {
    try {
      const result = this.postModel.find().exec();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getSinglePost(id: string): Promise<IPost> {
    try {
      const post = await this.findProduct(id);
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(id: string, title: string, text: string): Promise<IPost> {
    const postUpdate = await this.findProduct(id);
    if (title) {
      postUpdate.title = title;
    }
    if (text) {
      postUpdate.text = text;
    }
    return postUpdate.save();
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const deletedPost = await this.postModel.deleteOne({ _id: id }).exec();
      if (deletedPost.n === 0) {
        throw new NotFoundException('Could not find post.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async findProduct(id: string): Promise<IPost> {
    let post: IPost;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
