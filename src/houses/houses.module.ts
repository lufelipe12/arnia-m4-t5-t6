import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';

@Module({
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
