import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { CreatePostDto } from '../../modules/post/dto/create-post-dto';

@Entity({ name: 'posts' })
export class PostSchema {
  constructor(postDto: CreatePostDto) {
    Object.assign(this, postDto);
  }
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  ownerId: string;
}
