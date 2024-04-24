import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from 'src/database/entities/House.entity';
import { UsersModule } from 'src/users/users.module';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([House]), UsersModule],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
