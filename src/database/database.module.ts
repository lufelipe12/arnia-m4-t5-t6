import { Module } from '@nestjs/common';
import DatabaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(DatabaseConfig)],
})
export class DatabaseModule {}
