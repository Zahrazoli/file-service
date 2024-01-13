import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import IsLoggedInException from '../exceptions/isLoggedIn.exception';

export default class IsLoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.session.isLoggedIn) {
      throw new IsLoggedInException();
    }
    return true;
  }
}
