import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';

import NotFoundExceptionFilter from './component/exception-filters/notFound.exception.filter';
import UnAuthenticatedExceptionFilter from './component/exception-filters/UnAuthenticated.exception.filter';
import IsLoggedInExceptionFilter from './component/exception-filters/isLoggedIn.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  let redisClient = new Redis({
    port: 31726,
    host: 'el-capitan.liara.cloud',
    password: 'oFnybSTJN3sDe04D1GqFqdzz',
  });
  redisClient.connect().catch(console.error);
  let redisStore = new RedisStore({ client: redisClient });
  app.use(
    session({
      store: redisStore,
      secret: 'as1h738dg173ydbq',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60 * 1000 },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new UnAuthenticatedExceptionFilter(),
    new IsLoggedInExceptionFilter(),
  );

  const server = await app.listen(3000, '0.0.0.0');
  console.log(`Server Is Running On http://localhost:3000 ....`);
}
bootstrap();
