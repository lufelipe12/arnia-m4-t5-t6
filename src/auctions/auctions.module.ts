import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { Auctions } from '../database/entites';

@Module({
  imports: [TypeOrmModule.forFeature([Auctions])],
  controllers: [AuctionsController],
  providers: [AuctionsService],
})
export class AuctionsModule {}
