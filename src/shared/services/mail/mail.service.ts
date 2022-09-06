import {Injectable, Logger} from '@nestjs/common';
import {ISendMailOptions, MailerService} from "@nestjs-modules/mailer";
import {HttpResponse} from "../../../response";
import {INTERNAL_ERROR} from "../../../constants";
import {MailOptions} from "../../models";

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(private readonly mailerService: MailerService) {
    }

    async sendMail(options:  MailOptions): Promise<HttpResponse> {
        let httpResponse: HttpResponse;

        const mailOptions: ISendMailOptions = {
            to: 'test@nestjs.com',
            from: 'noreply@nestjs.com',
            subject: options.subject,
            template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
            context: {
                // Data to be sent to template engine.
                code: 'cf1a3f828287',
                username: 'john doe',
            },
        }
        try {
            await this.mailerService.sendMail(mailOptions);

            httpResponse = new HttpResponse(true, null)
        } catch (err) {
            this.logger.error(`Error while send mail: ${JSON.stringify(mailOptions)}\n${err}`);
            httpResponse  = new HttpResponse(false, null, [[INTERNAL_ERROR, err.toString()]]);
        }

        return httpResponse;
    }

}
