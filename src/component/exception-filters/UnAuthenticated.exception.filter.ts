import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import UnAuthenticatedException from '../exceptions/UnAuthenticated.exception';

@Catch(UnAuthenticatedException)
export default class UnAuthenticatedExceptionFilter
  implements ExceptionFilter<UnAuthenticatedException>
{
  catch(exception: UnAuthenticatedException, host: ArgumentsHost): any {
    const res = host.switchToHttp().getResponse<Response>();
    res.redirect('/');
  }
}
