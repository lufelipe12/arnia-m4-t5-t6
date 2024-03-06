import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloArnia(): string {
    return 'Hello Arnia!';
  }
}
