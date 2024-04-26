import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRoleEnum.SELLER])
  @Post()
  create(
    @Body() createHouseDto: CreateHouseDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.housesService.create(createHouseDto, user.sub);
  }

  @Get()
  findAll() {
    return this.housesService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRoleEnum.BUYER])
  @Post(':id/buy')
  buyHouse(@Param('id') id: string, @CurrentUser() user: CurrentUserDto) {
    return this.housesService.buyHouse(+id, user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.housesService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.housesService.softDelete(+id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.housesService.restore(+id);
  }
}
