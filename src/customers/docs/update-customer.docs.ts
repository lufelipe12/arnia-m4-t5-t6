import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDocs } from './create-customer.docs';

export class UpdateCustomerDocs extends PartialType(CreateCustomerDocs) {}
