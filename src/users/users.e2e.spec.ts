import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { userRepositoryMock } from '../testing/users/userRepository.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuard } from '../testing/guards/auth-guard.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { usersMock } from '../testing/users/users.mock';
import { updateUserDtoMock } from '../testing/users/update-user-dto.mock';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should be defined.', () => {
    expect(app).toBeDefined();
  });

  describe('create', () => {
    it('/users (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDtoMock);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('findAll', () => {
    it('/users (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(usersMock);
    });
  });

  describe('profile', () => {
    it('/users/profile (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('findOne', () => {
    it('/users/:id (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('/users/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/1')
        .send(updateUserDtoMock);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('softDelete', () => {
    it('/users/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer()).delete('/users/1');

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
    });
  });
});
