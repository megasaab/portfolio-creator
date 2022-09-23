import { Injectable, Logger } from '@nestjs/common';
import { Portfolio, PortfolioDocument } from "../../schemas/portfolio.schema";
import { HttpResponse } from "../../../response";
import {INTERNAL_ERROR, NOT_FOUND} from "../../../constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Project, ProjectDocument } from "../../schemas/project.schema";

@Injectable()
export class ProjectService {
    private readonly logger = new Logger(ProjectService.name);

    constructor(
        @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
    ) {

    }


    async createProject(projectDto: Project, portfolioId: any): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        try {
            if (!projectDto || !portfolioId) {
                return new HttpResponse(false,null, ['EMPTY PROJECT OR ID NOT FOUND']);
            }
            const project = await this.projectModel.create(projectDto);

            await this.portfolioModel.findOneAndUpdate(portfolioId, {
                $push: { projects: project }
            });
            httpResponse = new HttpResponse(true, project);
        } catch (err) {
            this.logger.error(`Error while create project: project ${projectDto}\n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

    async deleteProject(id: ObjectId, portfolioId: any): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        try {
            const project = await this.projectModel.findOne({_id: id});
            if (!project || !portfolioId) {
                return new HttpResponse(false,null, [NOT_FOUND]);
            }
            await this.projectModel.deleteOne({_id: id});
            await this.portfolioModel.updateOne({_id: portfolioId}, {
                $pull: {
                    projects: id,
                },
            });
            httpResponse = new HttpResponse(true,null);
        } catch (err) {
            this.logger.error(`Error while deleting project: \n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }
}
