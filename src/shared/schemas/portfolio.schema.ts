import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Types } from "mongoose";
import { Project } from "./project.schema";

export type PortfolioDocument = Portfolio & Document;

/* Portfolio */
@Schema()
export class Portfolio {
    _id: any

    /* Author name */
    @Prop()
    title: string;
    /* Created date */
    @Prop({default: Date.now})
    date: Date;
    /* Technologies */
    @Prop()
    technologies: string;
    /* description project */
    @Prop()
    description: string;
    /* Additional links */
    @Prop({type: [Object]})
    additionalLinks: string[];
    /* Project logo */
    @Prop()
    logo: string;
    /* Projects ids [] */
    @Prop({type: [Types.ObjectId], ref: Project.name})
    projects: Project[];
    /* exp in mark down */
    @Prop({type: [Object]})
    workExperience: string[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
