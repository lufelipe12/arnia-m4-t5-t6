import { getRepositoryToken } from '@nestjs/typeorm';
import { EventPhoto } from '../../events/entities/event-photo.entity';

export const eventsPhotosRepositoryMock = {
  provide: getRepositoryToken(EventPhoto),
  useValue: {
    create: jest.fn().mockReturnValue({}),
    save: jest.fn(),
  },
};
