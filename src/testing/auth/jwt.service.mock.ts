import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest
      .fn()
      .mockResolvedValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcm5pYV9jYXJzIiwic3ViIjoidXNlcnNfYXV0aCIsImF1ZCI6ImFybmlhX2NhcnNfdXNlcnMiLCJ1c2VyRW1haWwiOiJsZkBnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlhdCI6MTcxMjc5MTQzMCwiZXhwIjoxNzEyNzkxNDQwfQ.mGnrtS6bK-tOZKr06EsM3PdULX27EPXKfXb85rmkSak',
      ),
  },
};
