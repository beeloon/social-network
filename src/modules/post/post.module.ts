import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from '../../db/entities/Post/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: Post }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
