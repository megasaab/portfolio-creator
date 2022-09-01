import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
    _id: any

    /* Author name */
    @Prop()
    title: string;
    /* Created date */
    @Prop()
    date: Date;
    /* Technologies */
    @Prop()
    technologies: string;
    /* About project */
    @Prop()
    description: string;
    /* Additional links */
    @Prop({type: [Object]})
    additionalLinks: string[];
    /* Project screenshots */
    @Prop({type: [Object]})
    screenshots: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
