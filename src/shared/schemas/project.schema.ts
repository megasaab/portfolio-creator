import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    _id: any

    /* Author name */
    @Prop()
    author: string;
    /* Created date */
    @Prop()
    date: Date;
    /* About project */
    @Prop()
    about: string;
    /* Description */
    @Prop()
    description: string;
    /* Additional links */
    @Prop({type: [Object]})
    additionalLinks: string[];
    @Prop()
    logo: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
