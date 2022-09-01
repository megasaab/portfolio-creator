import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { UserInterface, UserLogin } from '../../../shared/schemas/user.schema';
import { PwdAuthGuard } from '../../../shared/services/security/security-guards';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpResponse } from "../../../response";

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiOperation({ description: 'sign in method' })
  @ApiResponse({ type: HttpResponse })
  @Post('/login')
  @UseGuards(PwdAuthGuard)
  // Body only for swagger description
  async authenticate(@Body() loginDto: UserLogin, @Request() req: any) {
    return this. authService.login(req.user);
  }

  @ApiOperation({ description: 'registration user method' })
  @ApiResponse({ type: HttpResponse })
  @Post('/registration')
  async registration(@Body() userDto: UserInterface) {
    return this.authService.registration(userDto);
  }
}
