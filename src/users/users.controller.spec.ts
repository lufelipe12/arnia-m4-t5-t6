import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock, createUserMock, usersServiceMock } from '../testing';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an user', async () => {
      const result = await usersController.create(createUserMock);

      expect(result).toHaveProperty('id');
    });
  });

  describe('Read', () => {
    it('Should return an users profile.', async () => {
      const result = await usersController.profile({ userId: 1 });

      expect(result).toHaveProperty('id');
    });
  });

  describe('Auth guard', () => {
    it('If auth guard is applied on profiles route', async () => {
      const guards = Reflect.getMetadata('__guards__', usersController.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});
