import { HttpException } from '@nestjs/common';

export default class IsLoggedInException extends HttpException {
  constructor() {
    super('LoggedIn', 403);
  }
}
