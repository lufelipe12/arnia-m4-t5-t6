import { PartialType } from '@nestjs/swagger';
import { CreateHouseDto } from './create-house.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {}
