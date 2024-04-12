import { Test, TestingModule } from '@nestjs/testing';

import { CarsService } from './cars.service';
import {
  carPhotoMock,
  carsPhotosRepositoryMock,
  carsRepositoryMock,
  configServiceMock,
  getFileMock,
} from '../testing';

describe('CarsService', () => {
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        carsRepositoryMock,
        carsPhotosRepositoryMock,
        configServiceMock,
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  it('Should be defined', () => {
    expect(carsService).toBeDefined();
  });

  describe('Upload photo', () => {
    it('Should upload a new photo', async () => {
      const result = await carsService.uploadPhoto(1, await getFileMock());

      expect(result).toEqual(carPhotoMock);
    });
  });
});
