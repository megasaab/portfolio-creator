import { Injectable, Logger } from '@nestjs/common';
import { UserInterface, User, UserDocument } from '../../schemas/user.schema';
import { SecurityService } from '../security/security.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from '../../../response';
import { INTERNAL_ERROR, INVALID_CREDENTIALS } from '../../../constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private securityService: SecurityService) {
  }

  async login(userDto: any) {
    let httpResponse: HttpResponse;
    try {
      const accessToken = await this.securityService.generateJwtToken(userDto);
      httpResponse = new HttpResponse(true, { user: userDto, accessToken });
    } catch (err) {
      this.logger.error(`Error while authenticating user. User: ${userDto}\n${err}`);
      httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
    }

    return httpResponse ;
  }

  async registration(userDto: UserInterface) {

    let httpResponse: HttpResponse;

    if (!(userDto.password && userDto.login && userDto.email || userDto.phone)) {
      return new HttpResponse(false, null, [[INVALID_CREDENTIALS, `new User: ${JSON.stringify(userDto)}`]]);
    }

    try {
      const user = { ...userDto } as User;

      user.passwordHash = await this.securityService.generatePasswordHash(userDto.password);
      user.createdAt = new Date();

      const createdUser: User = await this.userModel.create(user);

      httpResponse = new HttpResponse(true, {
        user: {
          login: createdUser.login,
          personalData: createdUser.phone || createdUser.email,
          createdAt: createdUser.createdAt
        },
        token: await this.securityService.generateJwtToken(createdUser)
      });

    } catch (err) {
      this.logger.error(`Error while creating user ${JSON.stringify(userDto)}\n${err}`);
      httpResponse = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
    }

    return httpResponse;
  }
}
