import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { UserCustomer } from './user_customer.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialDto);
  }

  @Post('/verify-code')
  @UseGuards(AuthGuard())
  test(@Req() req, @Body() code: string) {
    // console.log(req.user);
    return this.authService.verifyUser(req.user, code);
  }
}
