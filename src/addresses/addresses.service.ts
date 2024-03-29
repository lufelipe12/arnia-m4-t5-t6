import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    try {
      const address = this.addressRepository.create(createAddressDto);
      await this.addressRepository.save(address);

      return address;
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Bad Request',
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto, userId: number) {
    try {
      const address = await this.addressRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });

      if (address.user.id !== userId) {
        throw new ForbiddenException();
      }

      const { affected } = await this.addressRepository.update(
        id,
        updateAddressDto,
      );

      if (affected === 0) {
        throw new NotFoundException();
      }

      return this.addressRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Server Error',
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
