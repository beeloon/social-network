import { Module } from '@nestjs/common';
import { SQLDatabaseProviders } from './db.providers';

@Module({
  providers: [...SQLDatabaseProviders],
  exports: [...SQLDatabaseProviders],
})
export class SQLDatabaseModule {}
