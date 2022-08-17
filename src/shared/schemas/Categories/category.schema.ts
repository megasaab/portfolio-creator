import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user.schema';

export interface Products {
  name: string;
  price: string;
  rate: number;
  description: string;
  discount: boolean;
  discountPrice: number;
  vendor: string;
  uuid: string;
}

export type CategoryDocument = Category & Document;
//TODO чуть улучшить связь моделей
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
