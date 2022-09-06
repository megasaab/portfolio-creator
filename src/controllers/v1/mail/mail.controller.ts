import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../shared/services/security/security-guards";
import {HttpResponse} from "../../../response";
import {MailOptions} from "../../../shared/models";
import {MailService} from "../../../shared/services/mail/mail.service";


@ApiBearerAuth('access-token')
@ApiTags('Mail')
@UseGuards(JwtAuthGuard)
@Controller('v1/mail')
export class MailController {

    constructor(private mailService: MailService) {
    }

    @ApiOperation({description: 'Send Mail'})
    @ApiResponse({type: HttpResponse})
    @Post('/send-mail')
    deletePortfolio(@Body() body: MailOptions) {
        return this.mailService.sendMail(body)
    }
}
