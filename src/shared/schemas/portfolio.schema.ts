import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { ObjectId, Types } from "mongoose";
import { Project } from "./project.schema";
import { ApiProperty } from "@nestjs/swagger";
import {SWAGGER_PROPERTY} from "../../../swagger-property";

export type PortfolioDocument = Portfolio & Document;

const PORTFOLIO_PROPERTY = SWAGGER_PROPERTY.PORTFOLIO;

export class PortfolioDescriptionDto {
    @ApiProperty(PORTFOLIO_PROPERTY.SELF)
    portfolio: any;

    @ApiProperty(PORTFOLIO_PROPERTY.ID)
    id: ObjectId;
}

export class DeletePortfolioDto {
    @ApiProperty(PORTFOLIO_PROPERTY.ID)
    id: ObjectId;
}

@Schema()
export class Portfolio {
    _id: any

    @ApiProperty(PORTFOLIO_PROPERTY.TITLE)
    @Prop()
    title: string;

    @ApiProperty(PORTFOLIO_PROPERTY.DATE)
    @Prop({default: Date.now})
    date: Date;

    @ApiProperty(PORTFOLIO_PROPERTY.DESCRIPTION)
    @Prop()
    description: string;

    @ApiProperty(PORTFOLIO_PROPERTY.ADDITIONAL_LINKS)
    @Prop({type: [Object]})
    additionalLinks: string[];

    @ApiProperty(PORTFOLIO_PROPERTY.LOGO)
    @Prop()
    logo: string;

    @ApiProperty(PORTFOLIO_PROPERTY.PROJECTS)
    @Prop({type: [Types.ObjectId], ref: Project.name})
    projects: Project[];

    @ApiProperty(PORTFOLIO_PROPERTY.WORK_EXPERIENCE)
    @Prop({type: [Object]})
    workExperience: {
        date: Date,
        title: string,
        description: string;
    }[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
