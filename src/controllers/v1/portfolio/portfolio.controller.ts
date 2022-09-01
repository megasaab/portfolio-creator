import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { Portfolio } from "../../../shared/schemas/portfolio.schema";
import { PortfolioService } from "../../../shared/services/portfolio/portfolio.service";
import {JwtAuthGuard} from "../../../shared/services/security/security-guards";

@UseGuards(JwtAuthGuard)
@Controller('v1/portfolio')
export class PortfolioController {

    constructor(private portfolioService: PortfolioService
    ) {
    }

    @Post('/create')
    async createPortfolio(@Body() portfolioDto: Portfolio, @Request() req) {
        return this.portfolioService.createPortfolio(portfolioDto, req.user._id);
    }
}
