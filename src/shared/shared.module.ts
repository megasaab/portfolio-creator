import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { JWT_EXPIRES_IN, JWT_SECRET, MONGO_PASS, MONGO_URL, MONGO_USER } from "../constants";
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from './schemas/user.schema';
import { SecurityService } from './services/security/security.service';
import { JwtAuthStrategy } from './services/security/jwt-auth-strategy';
import { PwdAuthStrategy } from './services/security/pwd-auth-strategy';
import { Category, CategorySchema } from './schemas/Categories/category.schema';
import { StorageService } from './services/storage/storage.service';
import { Vendor, VendorSchema } from './schemas/Vendors/vendor.schema';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: false,
      property: 'user',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { issuer: 'amazon-clone',  expiresIn: JWT_EXPIRES_IN },
    }),
    MongooseModule.forRoot(MONGO_URL,
      {
        auth: {
          password: MONGO_PASS,
          username: MONGO_USER,
        },
        authSource: 'admin',
        useNewUrlParser: true,
      }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Vendor.name, schema: VendorSchema}
    ])
  ],
  providers:[AuthService, SecurityService, JwtAuthStrategy, PwdAuthStrategy, StorageService],
  exports: [AuthService, SecurityService, PassportModule, StorageService]
})
export class SharedModule {}
