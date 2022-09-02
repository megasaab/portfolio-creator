import {Body, Controller, Delete, Get, Post, Request, UseGuards} from '@nestjs/common';
import {
    DeletePortfolioDto,
    Portfolio,
    PortfolioDescriptionDto
} from "../../../shared/schemas/portfolio.schema";
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

    @ApiOperation({ description: 'create portfolio for user'})
    @ApiResponse({ type: HttpResponse })
    @Post('/create')
    async createPortfolio(@Body() portfolioDto: Portfolio, @Request() req) {
        return this.portfolioService.createPortfolio(portfolioDto, req.user._id);
    }

    @ApiOperation({ description: "get user's portfolios" })
    @ApiResponse({ type: HttpResponse })
    @Get('/get-portfolios')
    async getPortfolios(@Request() req) {
        return this.portfolioService.getPortfolios(req.user._id);
    }

    @ApiOperation({ description: 'edit description' })
    @ApiResponse({ type: HttpResponse })
    @Post('/edit')
    editDescription(@Body() PortfolioDescriptionDto: PortfolioDescriptionDto) {
        const { portfolio, id } = PortfolioDescriptionDto;

        return this.portfolioService.editPortfolio(portfolio, id);
    }


    @ApiOperation({ description: 'edit description' })
    @ApiResponse({ type: HttpResponse })
    @Delete('/delete')
    deletePortfolio(@Body() body: DeletePortfolioDto) {
        const { id } =  body;

        return this.portfolioService.deletePortfolio(id);
    }

}
