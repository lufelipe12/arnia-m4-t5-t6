import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // pegar request
    const request = context.switchToHttp().getRequest();
    // pegar token
    const token = this.getTokenFromHeader(request);

    // verificar se token existe
    if (!token) {
      throw new UnauthorizedException();
    }

    // verificar token
    try {
      // pegar usuario
      const res = await this.jwtService.verifyAsync(token);

      // inserir usuario na request
      request['user'] = res;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromHeader(request: Request) {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
