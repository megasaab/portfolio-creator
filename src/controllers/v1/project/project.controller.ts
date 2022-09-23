import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../shared/services/security/security-guards";
import { ProjectService } from "../../../shared/services/project/project.service";
import { HttpResponse } from "../../../response";

@ApiBearerAuth('access-token')
@ApiTags('Project')
@UseGuards(JwtAuthGuard)
@Controller('v1/project')
export class ProjectController {

    constructor(private projectService: ProjectService
    ) {
    }

    @ApiOperation({ description: 'create project for portoflio'})
    @ApiResponse({ type: HttpResponse })
    @Post('/create')
    async createProject(@Body() body: any, @Request() req) {
        const { project, portfolioId } = body;
        return this.projectService.createProject(project, portfolioId);
    }
}
