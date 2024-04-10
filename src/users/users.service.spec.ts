import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { userRepositoryMock } from '../testing/users/userRepository.mock';
import { usersMock } from '../testing/users/users.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = await service.create(createUserDtoMock);

      expect(user).toEqual(userMock);
      expect(userRepositoryMock.useValue.create).toHaveBeenCalledWith(
        createUserDtoMock,
      );
    });
  });

  describe('findAll', () => {
    it('findAll', async () => {
      const users = await service.findAll();

      expect(users).toEqual(usersMock);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const updatedUser = await service.update(1, createUserDtoMock);

      expect(updatedUser).toEqual(userMock);
    });
  });
});
