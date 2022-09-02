import {Injectable, Logger } from '@nestjs/common';
import { Portfolio, PortfolioDocument } from "../../schemas/portfolio.schema";
import { HttpResponse } from "../../../response";
import { INTERNAL_ERROR, NOT_FOUND } from "../../../constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User, UserDocument } from "../../schemas/user.schema";

@Injectable()
export class PortfolioService {
    private readonly logger = new Logger(PortfolioService.name);

    constructor(
        @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {

    }

    async createPortfolio(portfolioDto: Portfolio, userId: any): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        try {
            const portfolio = await this.portfolioModel.create(portfolioDto);

            await this.userModel.findOneAndUpdate(userId, {
                $push: { portfolios: portfolio }
            });
            httpResponse = new HttpResponse(true, portfolio);
        } catch (err) {
            this.logger.error(`Error while create portfolio: Portfolio ${portfolioDto}\n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

    async getPortfolios(userId: ObjectId): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        try {
            const user: User = await this.userModel.findOne(userId).lean().populate('portfolios');
            httpResponse = new HttpResponse(true, user.portfolios);
        } catch (err) {
            this.logger.error(`Error while getting portfolio: \n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

    async editPortfolio(portfolioDto: Portfolio, id: ObjectId): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        try {
            const portfolio = await this.portfolioModel.findOneAndUpdate(id, portfolioDto, { new: true })
            httpResponse = new HttpResponse(true, portfolio);
        } catch (err) {
            this.logger.error(`Error while editing portfolio: \n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

    async deletePortfolio(id: ObjectId) {
        let httpResponse: HttpResponse;

        try {
            const portfolio = await this.portfolioModel.findOne({_id: id});
            if (!portfolio) {
                return new HttpResponse(false,null, [NOT_FOUND]);
            }
            await this.portfolioModel.deleteOne({_id: id});
            httpResponse = new HttpResponse(true,null);
        } catch (err) {
            this.logger.error(`Error while deleting portfolio: \n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

}
