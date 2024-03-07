import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  create(@Body() data: CreateCustomerDto) {
    return this.customerService.create(data);
  }

  @Get()
  listAll(@Query('age') age?: string): Customer[] {
    return this.customerService.listAll(+age);
  }

  @Get(':id')
  findById(@Param('id') id: string): Customer {
    return this.customerService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    return this.customerService.update(+id, data);
  }
}
