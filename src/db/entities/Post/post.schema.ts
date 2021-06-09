import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../Users/user';
import { Entity } from 'typeorm';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Entity, ref: 'ownerId' })
  ownerId: User;
}

export interface IPost extends mongoose.Document {
  id: string;
  title: string;
  text: string;
  ownerId: string;
}
