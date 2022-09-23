import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthController } from './controllers/v1/auth/auth.controller';
import { PortfolioController } from "./controllers/v1/portfolio/portfolio.controller";
import { MailController } from "./controllers/v1/mail/mail.controller";
import {ProjectController} from "./controllers/v1/project/project.controller";

@Module({
  imports: [SharedModule],
  controllers: [
    AuthController,
    PortfolioController,
    MailController,
    ProjectController
  ],
  providers: [],
})
export class AppModule {}
