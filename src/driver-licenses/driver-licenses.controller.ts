import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { DriverLicensesService } from './driver-licenses.service';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('driver-licenses')
export class DriverLicensesController {
  constructor(private readonly driverLicensesService: DriverLicensesService) {}

  @Post()
  async create(
    @CurrentUser() currentUser: { userId: number },
    @Body() payload: CreateDriverLicenseDto,
  ) {
    const { userId } = currentUser;
    return await this.driverLicensesService.create(userId, payload);
  }
}
