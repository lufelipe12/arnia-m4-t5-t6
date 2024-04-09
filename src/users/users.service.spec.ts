import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { createUserMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // act
      const user = await userService.create(createUserMock);

      // assert
      expect(user).toEqual(userMock);
    });
  });

  describe('isEmailExists', () => {
    it('should return false when email doesnt exist', async () => {
      // act
      const user = await userService.isEmailExists(createUserMock.email);

      // assert
      expect(user).toEqual(false);
    });
  });

  describe('profile', () => {
    it("should return a users' profile", async () => {
      // act
      const profile = await userService.profile(userMock.id);

      // assert
      expect(profile).toEqual(userMock);
    });
  });
});
