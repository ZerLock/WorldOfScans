import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import utils from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  await app.listen(utils.isDevelopmentMode() ? 8080 : 3000);
}
bootstrap();
