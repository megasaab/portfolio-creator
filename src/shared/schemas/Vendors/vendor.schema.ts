import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
  _id: any;

  @Prop()
  name: string;
  @Prop()
  country: string;
}


export const VendorSchema = SchemaFactory.createForClass(Vendor);
