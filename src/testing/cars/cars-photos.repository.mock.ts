import { getRepositoryToken } from '@nestjs/typeorm';

import { CarPhotos } from '../../database/entites';
import { carPhotoMock } from './car-photo.mock';

export const carsPhotosRepositoryMock = {
  provide: getRepositoryToken(CarPhotos),
  useValue: {
    create: jest.fn().mockReturnValue(carPhotoMock),
    save: jest.fn(),
  },
};
