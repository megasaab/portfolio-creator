import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from "mongoose";
import { Portfolio } from "./portfolio.schema";
import { ApiProperty } from "@nestjs/swagger";
import { SWAGGER_PROPERTY } from "../../../swagger-property";

export interface UserPayload {
  sub: string; // User ID
  name: string;
}

const USER_PROPERTY = SWAGGER_PROPERTY.USER;

export class UserLogin {
  @ApiProperty(USER_PROPERTY.LOGIN)
  login: string;
  @ApiProperty(USER_PROPERTY.PASSWORD)
  password: string
}

export class UserInterface {
  @ApiProperty(USER_PROPERTY.LOGIN)
  login?: string;

  @ApiProperty(USER_PROPERTY.PASSWORD)
  password?: string;

  @ApiProperty(USER_PROPERTY.EMAIL)
  email?: string;

  @ApiProperty(USER_PROPERTY.PHONE)
  phone?: string;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: any;

  /* Login (unique) */
  @Prop({ index: { unique: true } })
  login: string;
  /* Password hash (BCRYPT) */
  @Prop()
  passwordHash: string;
  /* Created date */
  @Prop()
  createdAt: Date;
  /*  Phone number */
  @Prop({ index: { unique: true } })
  phone: string;
  /* email address */
  @Prop({ index: { unique: true } })
  email: string;
  /* portfolios */
  @Prop({type: [Types.ObjectId], ref: Portfolio.name})
  portfolios: Portfolio[];
  /* avatar */
  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
