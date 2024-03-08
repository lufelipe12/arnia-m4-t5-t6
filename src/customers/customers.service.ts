import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];
  private id: number = 1;

  create(data: CreateCustomerDto) {
    this.customers.push({
      id: this.id,
      ...data,
    });

    this.id++;
  }

  listAll(age: number): Customer[] {
    if (age) {
      return this.customers.filter((item) => item.age === age);
    }
    return this.customers;
  }

  findById(id: number): Customer {
    return this.customers.find((item) => item.id === id);
  }

  update(id: number, data: UpdateCustomerDto) {
    const customer = this.findById(id);

    Object.assign(customer, data);
    return customer;
  }

  delete(id: number) {
    const customer = this.findById(id);

    if (customer) {
      const index = this.customers.indexOf(customer);
      this.customers.splice(index, 1);
      return customer;
    }

    throw new NotFoundException('Customer não encontrado');
  }
}
