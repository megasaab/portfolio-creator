import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { BCRYPT_HASH_ROUNDS } from '../../../constants';
import { User, UserDocument, UserPayload } from '../../schemas/user.schema';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  generateUuid(): string {
    return uuidv4();
  }

  async generatePasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_HASH_ROUNDS);
  }

  async generateJwtToken(user: User, jwtSignOptions: JwtSignOptions = null): Promise<string> {
    let jwtToken: string;

    if (user?._id) {
      const payload: UserPayload = { sub: user._id, name: user.login };
      jwtToken = await this.jwtService.signAsync(payload, jwtSignOptions);
    }

    return jwtToken;
  }

  async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async validateUser(login: string, password): Promise<User | null> {
    let result;
    const user: User = await this.userModel.findOne({ login });

    if (user && await this.checkPassword(password, user.passwordHash)) {
      result = user;
    }

    return result;
  }

}
