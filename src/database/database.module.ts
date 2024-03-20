import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfigOptions from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigOptions)],
})
export class DatabaseModule {}
