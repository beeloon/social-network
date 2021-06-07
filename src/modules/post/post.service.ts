import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPost } from './post.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PostService {
  private posts: IPost[] = [];

  constructor(@InjectModel('Post') private readonly postModel: Model<IPost>) {}

  async insertPost(title: string, text: string): Promise<IPost> {
    try {
      const id = uuidv4();
      const post = new this.postModel({ id, title, text });
      const result = await post.save();
      return result;
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
      //   return {
      //     id: post.id,
      //     title: post.title,
      //     text: post.text,
      //   };
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
