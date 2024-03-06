import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  create(@Body() data: CreateCustomerDto) {
    return this.customerService.create(data);
  }

  @Get()
  listAll(): Customer[] {
    return this.customerService.listAll();
  }
}
