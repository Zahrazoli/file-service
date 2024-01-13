import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import IsLoggedInException from '../exceptions/isLoggedIn.exception';

@Catch(IsLoggedInException)
export default class IsLoggedInExceptionFilter
  implements ExceptionFilter<IsLoggedInException>
{
  catch(exception: IsLoggedInException, host: ArgumentsHost): any {
    const res = host.switchToHttp().getResponse<Response>();
    res.redirect('/v1.0/dashboard');
  }
}
