import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APPLICATION_PORT, LOG_LEVELS } from './constants';
import { json, urlencoded } from 'body-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpResponse} from "./response";
import {Portfolio} from "./shared/schemas/portfolio.schema";
import {User} from "./shared/schemas/user.schema";
import {Project} from "./shared/schemas/project.schema";

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

  // Configure Swagger
  const config = new DocumentBuilder()
      .setTitle('Portfolio-creator')
      .setDescription('Portfolio-creator Backend REST APIs')
      .setVersion('0.2.13')
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'access-token',
      )
      .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [HttpResponse, Portfolio, User, Project]
  });

  SwaggerModule.setup('swagger', app, document, { explorer: true, swaggerOptions: { docExpansion: 'none' } });

  await app.listen(APPLICATION_PORT);
  console.info(`PORTFOLIO-CREATOR backend is listening on ${APPLICATION_PORT}`);
}
bootstrap();
