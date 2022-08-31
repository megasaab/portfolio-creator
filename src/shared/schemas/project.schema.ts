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
    /* Technologies */
    @Prop()
    technologies: string;
    /* About project */
    @Prop()
    about: string;
    /* Description */
    @Prop()
    description: string;
    /* Additional links */
    @Prop({type: [Object]})
    additionalLinks: string[];
    /* Project screenshots */
    @Prop({type: [Object]})
    screenshots: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
