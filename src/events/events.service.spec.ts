import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { eventsRepositoryMock } from '../testing/events/event-repository.mock';
import { eventsPhotosRepositoryMock } from '../testing/events/event-photo-repository.mock';
import { configServiceMock } from '../testing/config-service.mock';
import { userServiceMock } from '../testing/users/user-service.mock';
import { getPhotoMock } from '../testing/events/get-image.mock';
import { imageMock } from '../testing/events/image.mock';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        eventsRepositoryMock,
        eventsPhotosRepositoryMock,
        configServiceMock,
        userServiceMock,
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadPhoto', () => {
    it('Should return a image entity', async () => {
      // arrange
      const file = await getPhotoMock();

      // act
      const photo = await service.uploadPhoto(1, file);

      // assert
      expect(photo).toEqual(imageMock);
    });
  });
});
