import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_PORT, LOG_LEVELS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LOG_LEVELS
  });
  await app.listen(APPLICATION_PORT);
}
bootstrap();
