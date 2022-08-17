import { Body, Controller, Post, UseGuards, Request} from "@nestjs/common";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { UserInterface } from '../../../shared/schemas/user.schema';
import { PwdAuthGuard } from '../../../shared/services/security/security-guards';

@Controller('v1/auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/login')
  @UseGuards(PwdAuthGuard)
  async authenticate(@Request() req) {
    return this. authService.login(req.user);
  }


  @Post('/registration')
  async registration(@Body() userDto: UserInterface) {
    return this.authService.registration(userDto);
  }
}
