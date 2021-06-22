import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from 'src/database/database.module';
import { postProvider, userProvider } from 'src/database/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider, ...userProvider],
})
export class PostModule {}
