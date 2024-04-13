import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../../events/entities/event.entity';
import { eventMock } from './event.mock';

export const eventsRepositoryMock = {
  provide: getRepositoryToken(Event),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn().mockResolvedValue(eventMock),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
