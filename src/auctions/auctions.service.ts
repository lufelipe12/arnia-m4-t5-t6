import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auctions, Users } from '../database/entites';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auctions)
    private auctionsRepository: Repository<Auctions>,
  ) {}

  async create(payload: CreateAuctionDto) {
    try {
      const newAuction = this.auctionsRepository.create(payload);

      await this.auctionsRepository.save(payload);

      return newAuction;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async participate(id: number, currentUser: CurrentUserDto) {
    try {
      const auction = await this.auctionsRepository.findOne({
        where: { id },
        relations: { users: true },
      });

      if (!auction) {
        throw new NotFoundException(
          `An auction with this id: ${id} not found.`,
        );
      }

      auction.users.push({ id: currentUser.userId } as Users);

      await this.auctionsRepository.save(auction);

      return await this.auctionsRepository.findOne({
        where: { id },
        relations: { users: true },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      const auction = await this.auctionsRepository.findOne({
        where: { id },
        relations: { users: true },
      });

      if (!auction) {
        throw new NotFoundException(
          `An auction with this id: ${id} not found.`,
        );
      }

      await this.auctionsRepository.softDelete(auction.id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
