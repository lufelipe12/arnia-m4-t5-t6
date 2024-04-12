import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userServiceMock } from '../testing/users/user-service.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { usersMock } from '../testing/users/users.mock';
import { updateUserDtoMock } from '../testing/users/update-user-dto.mock';
import { authGuardUserMock } from '../testing/guards/auth-guard-user.mock';
import { authGuard } from '../testing/guards/auth-guard.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a new user', async () => {
      const user = await controller.create(createUserDtoMock);

      expect(user).toEqual(userMock);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const userList = await controller.findAll();

      expect(userList).toEqual(usersMock);
    });
  });

  describe('profile', () => {
    it('should return my profile', async () => {
      const profile = await controller.profile(authGuardUserMock);

      expect(profile).toEqual(userMock);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await controller.findOne('1');

      expect(user).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const user = await controller.update('1', updateUserDtoMock);

      expect(user).toEqual(userMock);
    });
  });

  describe('softDelete', () => {
    it('should return nothing', async () => {
      await controller.softDelete('1');

      expect(userServiceMock.useValue.softDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('AuthGuard', () => {
    it('should be defined', async () => {
      const guards = Reflect.getMetadata('__guards__', controller.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(guards[0]).toBe(AuthGuard);
    });
  });
});
