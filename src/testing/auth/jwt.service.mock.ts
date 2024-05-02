import { JwtService } from "@nestjs/jwt";

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest
      .fn()
      .mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      ),
  },
};
