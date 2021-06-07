import { Connection } from 'mongoose';
import { PostSchema } from './post.schema';

export const catsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
