import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { DriverLicensesService } from './driver-licenses.service';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('driver-licenses')
export class DriverLicensesController {
  constructor(private readonly driverLicensesService: DriverLicensesService) {}

  @Post()
  async create(
    @Request() req: Request,
    @Body() payload: CreateDriverLicenseDto,
  ) {
    const { userId } = req['user'];
    return await this.driverLicensesService.create(userId, payload);
  }
}
