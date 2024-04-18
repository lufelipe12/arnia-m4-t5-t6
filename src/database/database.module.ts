import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfigAsync from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class DatabaseModule {}
