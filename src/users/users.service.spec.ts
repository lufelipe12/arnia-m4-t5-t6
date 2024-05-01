import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/User.entity';
import { UsersService } from './users.service';
import { userMock } from '../testing/users/user.mock';

const usersMock = [userMock];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(usersMock),
            findOneOrFail: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      // arrange

      // act
      const users = await service.findAll();

      // assert
      expect(users).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      // arrange
      // act
      const user = await service.findOne(1);

      // assert
      expect(user).toEqual(userMock);
    });
  });
});
