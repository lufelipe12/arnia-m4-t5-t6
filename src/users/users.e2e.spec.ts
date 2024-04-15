import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { UsersModule } from './users.module';
import { authGuardMock, createUserMock, userRepositoryMock } from '../testing';
import { AuthGuard } from '../auth/guards/auth.guard';

describe('Users e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('createdAt');
    });

    it('Should return an error by creatin an user', async () => {
      const { email, ...wrongPayload } = createUserMock;

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(wrongPayload);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Read', () => {
    it('Should return an users profile', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.status).toEqual(200);
    });
  });
});
