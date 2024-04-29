import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";
import {
  createUserMock,
  jwtServiceMock,
  loginMock,
  usersServiceMock,
} from "../testing";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, usersServiceMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("Should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("Create", () => {
    it("Should register a new user", async () => {
      const newUser = await authService.register(createUserMock);

      expect(newUser).toHaveProperty("id");
    });
  });

  describe("Login", () => {
    it("Should return an auth token", async () => {
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true as never);

      const authToken = await authService.login(loginMock);

      expect(authToken).toHaveProperty("token");
      expect(typeof authToken.token).toBe("string");
    });
  });
});
