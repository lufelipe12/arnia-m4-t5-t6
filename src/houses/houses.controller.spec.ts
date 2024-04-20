import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

describe('HousesController', () => {
  let controller: HousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [HousesService],
    }).compile();

    controller = module.get<HousesController>(HousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
