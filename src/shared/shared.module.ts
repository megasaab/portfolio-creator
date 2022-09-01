import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from './schemas/user.schema';
import { SecurityService } from './services/security/security.service';
import { JwtAuthStrategy } from './services/security/jwt-auth-strategy';
import { PwdAuthStrategy } from './services/security/pwd-auth-strategy';
import { Project, ProjectSchema } from "./schemas/project.schema";
import { Portfolio, PortfolioSchema } from "./schemas/portfolio.schema";
import { PortfolioService } from "./services/portfolio/portfolio.service";
import { JWT_EXPIRES_IN, JWT_SECRET, MONGO_PASS, MONGO_URL, MONGO_USER } from "../constants";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      session: false,
      property: 'user',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { issuer: 'portfolio-creator',  expiresIn: JWT_EXPIRES_IN },
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
      { name: Project.name, schema: ProjectSchema },
      { name: Portfolio.name, schema: PortfolioSchema}
    ])
  ],
  providers:[AuthService, SecurityService, JwtAuthStrategy, PwdAuthStrategy, PortfolioService],
  exports: [AuthService, SecurityService, PassportModule, PortfolioService]
})
export class SharedModule {}
