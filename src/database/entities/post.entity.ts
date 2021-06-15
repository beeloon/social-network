import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn, Unique } from 'typeorm';

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
