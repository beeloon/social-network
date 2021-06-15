import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn, Unique } from 'typeorm';
import { CreatePostDto } from '../../modules/post/dto/create-post-dto';

@Unique(['title'])
@Entity({ name: 'posts' })
export class PostSchema {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  ownerId: string;
}
