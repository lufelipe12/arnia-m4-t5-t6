import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auctions')
@UseGuards(AuthGuard)
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  async create(@Body() payload: CreateAuctionDto) {
    return await this.auctionsService.create(payload);
  }

  @Post(':id/participate')
  async participate(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.auctionsService.participate(id, currentUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.auctionsService.delete(id);
  }
}
