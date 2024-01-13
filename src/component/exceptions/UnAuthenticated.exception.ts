import { HttpException } from '@nestjs/common';

export default class UnAuthenticatedException extends HttpException {
  constructor() {
    super('UnAuthenticated', 401);
  }
}
