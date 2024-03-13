import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDocs } from './docs/create-customer.docs';
import { UpdateCustomerDocs } from './docs/update-customer.docs';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiBody({
    type: CreateCustomerDocs,
  })
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

  @ApiBody({
    type: UpdateCustomerDocs,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    return this.customerService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.delete(id);
  }
}
