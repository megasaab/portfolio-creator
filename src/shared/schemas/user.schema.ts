import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Project } from "./project.schema";
import {Types} from "mongoose";

export interface UserPayload {
  sub: string; // User ID
  name: string;
}


export interface UserInterface {
  login?: string;
  password?: string;
  email?: string;
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
  /* email address*/
  @Prop({ index: { unique: true } })
  email: string;
  @Prop({type: [Types.ObjectId], ref: Project.name})
  projects: Project[];
}

export const UserSchema = SchemaFactory.createForClass(User);
