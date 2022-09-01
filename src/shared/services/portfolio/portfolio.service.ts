import {Injectable, Logger } from '@nestjs/common';
import { Portfolio, PortfolioDocument } from "../../schemas/portfolio.schema";
import { HttpResponse } from "../../../response";
import { INTERNAL_ERROR } from "../../../constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
            httpResponse = new HttpResponse(true, null);
        } catch (err) {
            this.logger.error(`Error while create portfolio: Portfolio ${portfolioDto}\n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }
        return httpResponse;
    }
}
