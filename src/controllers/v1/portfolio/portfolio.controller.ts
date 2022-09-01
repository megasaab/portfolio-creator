import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { Portfolio } from "../../../shared/schemas/portfolio.schema";
import { PortfolioService } from "../../../shared/services/portfolio/portfolio.service";
import {JwtAuthGuard} from "../../../shared/services/security/security-guards";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpResponse} from "../../../response";

@ApiBearerAuth('access-token')
@ApiTags('Portfolio')
@UseGuards(JwtAuthGuard)
@Controller('v1/portfolio')
export class PortfolioController {

    constructor(private portfolioService: PortfolioService
    ) {
    }

    @ApiOperation({description: 'create portfolio for user'})
    @ApiResponse({ type: HttpResponse })
    @Post('/create')
    async createPortfolio(@Body() portfolioDto: Portfolio, @Request() req) {
        return this.portfolioService.createPortfolio(portfolioDto, req.user._id);
    }

    @ApiOperation({description: "get user's portfolios"})
    @ApiResponse({ type: HttpResponse })
    @Get('/get-portfolios')
    async getPortfolios(@Request() req) {
        return this.portfolioService.getPortfolios(req.user._id);
    }
}
