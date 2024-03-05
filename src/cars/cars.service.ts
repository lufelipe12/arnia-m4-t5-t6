import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  findAll() {
    return 'Find all';
  }
}
