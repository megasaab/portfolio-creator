import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthController } from './controllers/v1/auth/auth.controller';
import { StorageController } from './controllers/v1/storage/storage.controller';

@Module({
  imports: [SharedModule],
  controllers: [
    AuthController,
    StorageController
  ],
  providers: [],
})
export class AppModule {}
