import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export default class NotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const res = host.switchToHttp().getResponse<Response>();
    res.status(404).render('404');
  }
}
