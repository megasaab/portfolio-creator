import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthController } from './controllers/v1/auth/auth.controller';

@Module({
  imports: [SharedModule],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
