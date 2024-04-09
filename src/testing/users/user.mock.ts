import { RolesEnum } from '../../auth/enums/roles.enum';

export const userMock = {
  id: 1,
  age: 15,
  email: 'test@teste.com',
  firstName: 'Teste',
  lastName: 'Reis',
  password: 'testing',
  role: RolesEnum.user,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  driverLicense: [],
  cars: [],
  auctions: [],
};
