import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthController } from './controllers/v1/auth/auth.controller';
import { PortfolioController } from "./controllers/v1/portfolio/portfolio.controller";

@Module({
  imports: [SharedModule],
  controllers: [
    AuthController,
    PortfolioController
  ],
  providers: [],
})
export class AppModule {}
