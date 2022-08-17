import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_PORT, LOG_LEVELS } from './constants';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LOG_LEVELS
  });

  // Enable custom middleware and hooks
  app.enableShutdownHooks();
  app.enableCors();
  // Increase payload limits for photos etc.
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  await app.listen(APPLICATION_PORT);
  console.info(`AMAZON-CLONE NEST backend is listening on ${APPLICATION_PORT}`);
}
bootstrap();
