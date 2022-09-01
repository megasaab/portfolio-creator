import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from "mongoose";
import { Portfolio } from "./portfolio.schema";

export interface UserPayload {
  sub: string; // User ID
  name: string;
}


export class UserInterface {
  /* Login */
  login?: string;
  /* Password */
  password?: string;
  /* Email */
  email?: string;
  /* Phone */
  phone?: string;
}

export type UserDocument = User & Document;

/* User */
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
  /* email address*/
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
