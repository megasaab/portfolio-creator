import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Products {
  name: string;
  price: string;
  rate: number;
  description: string[];
  discount: boolean;
  discountPrice: number;
  vendor: string;
  vendorId: number;
  uuid: string;
  base64Photos: string[];
  type: string;
  color: string;
}

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id: any;

  @Prop({ index: { unique: true } })
  name: string;
  @Prop({ type: [Object] })
  subCategory: {
    uuid: string;
    name: string;
    products: Products[]
  }[];
}


export const CategorySchema = SchemaFactory.createForClass(Category);
