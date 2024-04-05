import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDoc {
  @ApiProperty({
    title: 'Acces Token',
    description: 'Token used to user authorization.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcm5pYV9jYXJzIiwic3ViIjoidXNlcnNfYXV0aCIsImF1ZCI6ImFybmlhX2NhcnNfdXNlcnMiLCJ1c2VyRW1haWwiOiJsZkBnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlhdCI6MTcxMjM1ODQ1OSwiZXhwIjoxNzEyMzU4NDY5fQ.kxoU0_mKADcFk_UT8kT02aK_J_Jms6s8H2MjBFwTQeE',
    type: String,
  })
  accessToken: string;
}
