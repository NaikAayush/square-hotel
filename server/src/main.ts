// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   console.log('ye');
//   const app: NestExpressApplication = await NestFactory.create(AppModule);
//   const config: ConfigService = app.get(ConfigService);
//   console.log(process.env.MONGO_USER);
//   const port: number = config.get<number>('PORT');

//   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

//   await app.listen(port, () => {
//     console.log('[WEB]', config.get<string>('BASE_URL'));
//   });
// }

// bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
